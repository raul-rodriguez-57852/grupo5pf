import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../models/alumno';
import { DataApiService } from '../../services/data-api.service';
import { NgForm } from '@angular/forms';
import { PasswordEmoji } from '../../models/password-emoji';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-alumno',
  templateUrl: './editar-alumno.component.html',
  styleUrls: ['./editar-alumno.component.css']
})
export class EditarAlumnoComponent implements OnInit {

  alumno: Alumno = {
    id: null, 
    nombre: null, 
    apellido: null, 
    documento: null, 
    tipoDocumento: null, 
    fechaNacimiento: null, 
    avatarUrl: null, 
    passwordEmoji: null, 
    tutorId: null, 
    saldoEstrellas: null, 
    mapRecompensas: null, 
    isActive: true,
    recompensas: [],
    listRecompensasComprada: [],
    listRecompensasEquipada: [],
    cursoBonusAlumno: null
  };
  alumnoDoc = null;
  emojis = [];
  emojisSeleccionados = [];
  AlumnoParaEditar = null;
  avatares = [
              { url: 'assets/img/avatares/avatar-1.png', index: 0},
              { url: 'assets/img/avatares/avatar-2.png', index: 1},
              { url: 'assets/img/avatares/avatar-3.png', index: 2},
              { url: 'assets/img/avatares/avatar-4.png', index: 3},
              { url: 'assets/img/avatares/avatar-5.png', index: 4},
              { url: 'assets/img/avatares/avatar-6.png', index: 5},
              { url: 'assets/img/avatares/avatar-7.png', index: 6},
              { url: 'assets/img/avatares/avatar-8.png', index: 7},
              { url: 'assets/img/avatares/avatar-9.png', index: 8},
              { url: 'assets/img/avatares/avatar-10.png', index: 9},
              { url: 'assets/img/avatares/avatar-11.png', index: 10},
              { url: 'assets/img/avatares/avatar-12.png', index: 11},
            ];
  avatarSeleccionado = null;
  tiposDoc = [];

  constructor(
    private dataApiService: DataApiService,
    private router: Router
  ) { }

 async ngOnInit() {
    this.defineUser();
    this.getEmojis();
    this.getTiposDoc();
    if( this.dataApiService.getUsuario() == null){
      Swal.fire('Lo sentimos, ocurrio un error. Vuelva a cargar la pagina', 'error');
    }
    var alumnoCookie = this.dataApiService.getCookie(this.dataApiService.studentCookie);
    if (alumnoCookie) {
     await this.dataApiService.getAlumno(alumnoCookie).then(
        (respuesta) => {
          this.AlumnoParaEditar = respuesta;
        }
      );
      this.addEmoji(this.AlumnoParaEditar.passwordEmoji.emoji1);
      this.addEmoji(this.AlumnoParaEditar.passwordEmoji.emoji2);
      this.addEmoji(this.AlumnoParaEditar.passwordEmoji.emoji3);
      this.seleccionar({'url':this.AlumnoParaEditar.avatarUrl});
      this.alumno.tipoDocumento = this.AlumnoParaEditar.documento.tipo;
      this.alumno.nombre = this.AlumnoParaEditar.nombre;
      this.alumno.apellido = this.AlumnoParaEditar.apellido;
      this.alumno.saldoEstrellas = this.AlumnoParaEditar.saldoEstrellas;
      this.marcarAvatarDelAlumno(this.AlumnoParaEditar.avatarUrl)
      this.alumno.id = Number(alumnoCookie);
      this.alumno.documento = this.AlumnoParaEditar.documento.numero;
      // ya tengo todo el alumno, borremos su cookie para no armar lio.
      this.dataApiService.deleteCookie(this.dataApiService.studentCookie);
    }
  }

  getTiposDoc() {
    this.dataApiService.getTiposDoc().then((tiposDoc) => {
      this.tiposDoc = tiposDoc;
    });
  }

  getEmojis() {
    this.dataApiService.getEmojis().then((respuesta) => {
      this.emojis = respuesta;
    });
  }

  clearEmoji() {
    this.emojisSeleccionados.pop();
  }

  async defineUser() {
    //special condition, where we set the tutor based on the sessionCookie.
    var session_id = this.dataApiService.getCookie("SessionCookie");
    var user_id;
    await this.dataApiService.validarSession(session_id).then(
      (respuesta) => {
        user_id = respuesta;
      }
    );
    this.dataApiService.setUser(user_id, this.dataApiService.getTutorType());
  }

  async save(formAlumno: NgForm) {
    try {
      this.trimFields(this.alumno);
      this.alumnoValidator(this.alumno);
    } catch (excepcion) {
      Swal.fire({
        title: 'Opps! Faltan estos datos:',
        icon: 'info',
        html:
          '<b>Revisar los siguientes campos: </b>' +
          '<table style="width:100%">' +
              '<tr>' +
                 excepcion.join('') +
              '</tr>' +
          '</table>'
      })
      return;
    }
    var idtutor = this.dataApiService.getUsuario();
    this.alumno.tutorId = idtutor;
    const pwd = new PasswordEmoji();
    pwd.emoji1Id = Number(this.emojisSeleccionados[0].id);
    pwd.emoji2Id = Number(this.emojisSeleccionados[1].id);
    pwd.emoji3Id = Number(this.emojisSeleccionados[2].id);
    this.alumno.passwordEmoji = pwd;
    this.alumno.avatarUrl = this.avatarSeleccionado.url;
    switch (this.alumno.tipoDocumento) {
      case 'Libreta Civica': {
        this.alumno.tipoDocumento = 'LC';
        break;
      }
      case 'Cedula de Identidad': {
        this.alumno.tipoDocumento = 'CI';
        break;
      }
      case 'Libreta de Enrolamiento': {
        this.alumno.tipoDocumento = 'LE';
        break;
      }
      default: {
        break;
      }
    }
    this.dataApiService.guardarAlumno(this.alumno).then(
      (respuesta) => {
        Swal.fire(
          this.alumno.nombre,
          '¡Bienvenido!',
          'success'
        );
        this.dataApiService.setUser(idtutor, this.dataApiService.getTutorType());
        this.irPerfiles();
      }
    ).catch(
      (respuesta) => {
        Swal.fire(
          this.alumno.nombre,
          'No se pudo crear ;(',
          'error'
        );
      }
    );
  }

  recargar() {
    window.location.reload();
  }

  addEmoji(emoji: any) {
    if (this.emojisSeleccionados.length < 3) {
      this.emojisSeleccionados.push(emoji);
    }
  }

  seleccionar(avatar: any) {
    this.avatarSeleccionado = avatar;
  }

  marcarAvatarDelAlumno(avatarUrl: any) {
    this.avatares.forEach( function (value) {
      if (value.url == avatarUrl) {
        var idDelAvatar = 'avatar-sel-' + value.index;
        (<HTMLInputElement>document.getElementById(idDelAvatar)).checked = true;
      }
    }
    )
  }

  irPerfiles(){
    this.router.navigate(['perfiles']);
  }

  alumnoValidator(alumnoParaEditar: Alumno) {
    var isValid = true;
    var missingElements = [];
    if (alumnoParaEditar.nombre == '' || alumnoParaEditar.nombre == null ) {
      missingElements.push('<td> Nombre del alumno. </td><tr></tr>');
    }
    if (alumnoParaEditar.apellido == '' || alumnoParaEditar.apellido == null) {
      missingElements.push('<td> Apellido del alumno. </td><tr></tr>');
    }
    if (alumnoParaEditar.documento == '' || alumnoParaEditar.documento == null) {
      missingElements.push('<td> Documento del alumno. </td><tr></tr>');
    }
    if (alumnoParaEditar.tipoDocumento === undefined || alumnoParaEditar.tipoDocumento == '' || alumnoParaEditar.tipoDocumento == null) {
      missingElements.push('<td> Tipo de Documento del alumno. </td><tr></tr>');
    }
    if (this.emojisSeleccionados.length < 3) {
      missingElements.push('<td> Contraseña de emojis. </td><tr></tr>');;
    }
    if (this.avatarSeleccionado == null) {
      missingElements.push('<td> Avatar del alumno. </td>');
    }

    if (missingElements.length > 0) {
      throw missingElements;
    }
    return true;
  }

  trimFields(alumno: Alumno) {
    try {
      this.alumno.nombre = alumno.nombre.trim();
      this.alumno.apellido = alumno.apellido.trim();
      this.alumno.documento = alumno.documento.trim();
    } catch (excepcion) {
      return
    }
    
  }

}

