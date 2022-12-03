import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../models/alumno';
import { DataApiService } from '../../services/data-api.service';
import { NgForm } from '@angular/forms';
import { PasswordEmoji } from '../../models/password-emoji';
import { Tutor } from 'src/app/models/tutor';
import { Router } from '@angular/router';
import { Console } from 'console';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-alumno',
  templateUrl: './editar-alumno.component.html',
  styleUrls: ['./editar-alumno.component.css']
})
export class EditarAlumnoComponent implements OnInit {

  alumno: Alumno = new Alumno();
  alumnoDoc = null;
  mensaje: string = null;
  emojis = [];
  emojisSeleccionados = [];
  AlumnoParaEditar = null;
  avatares = [{ url: 'assets/img/avatares/avatar-1.png'},
              { url: 'assets/img/avatares/avatar-2.png'},
              { url: 'assets/img/avatares/avatar-3.png'},
              { url: 'assets/img/avatares/avatar-4.png'},
              { url: 'assets/img/avatares/avatar-5.png'},
              { url: 'assets/img/avatares/avatar-6.png'},
              { url: 'assets/img/avatares/avatar-7.png'},
              { url: 'assets/img/avatares/avatar-8.png'},
              { url: 'assets/img/avatares/avatar-9.png'},
              { url: 'assets/img/avatares/avatar-10.png'},
              { url: 'assets/img/avatares/avatar-11.png'},
              { url: 'assets/img/avatares/avatar-12.png'}];
  avatarSeleccionado = null;
  tiposDoc = [];

  constructor(
    private dataApiService: DataApiService,
    private router: Router
  ) { }

 async ngOnInit() {
    this.getEmojis();
    this.getTiposDoc();
    if( this.dataApiService.getUsuario() == null){
      this.mensaje = "Permiso Denegado";
      document.getElementById('open-modal').click();
    }
    
    if (this.dataApiService.getUserType() == '2'){
     await this.dataApiService.getAlumno(this.dataApiService.getUsuario()).then(
        (respuesta) => {
          this.AlumnoParaEditar = respuesta;
        }
      );
      this.addEmoji(this.AlumnoParaEditar.passwordEmoji.emoji1);
      this.addEmoji(this.AlumnoParaEditar.passwordEmoji.emoji2);
      this.addEmoji(this.AlumnoParaEditar.passwordEmoji.emoji3);
      this.seleccionar(this.AlumnoParaEditar.avatarUrl);
      this.alumno.tipoDocumento = this.AlumnoParaEditar.documento.tipo;
      this.alumno.nombre = this.AlumnoParaEditar.nombre;
      this.alumno.apellido = this.AlumnoParaEditar.apellido;
      this.alumno.saldoEstrellas = this.AlumnoParaEditar.saldoEstrellas;
      console.log('ALUMNO: ', this.AlumnoParaEditar);
      console.log('ALUMNO: ', this.alumno);
    }
  }

  getTiposDoc() {
    this.dataApiService.getTiposDoc().then((tiposDoc) => {
      this.tiposDoc = tiposDoc;
      console.log(this.tiposDoc);
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

  async save(formAlumno: NgForm) {
    let tutor;
    
    if(this.dataApiService.getUserType() == '2'){
      await this.dataApiService.tutorByAlumno(this.dataApiService.getUsuario()).then(
        (respuesta) => {
          tutor = respuesta;
        }
      );
      var idtutor = tutor.id;
      this.alumno.id = this.dataApiService.getUsuario();
    }
    else{
      var idtutor = this.dataApiService.getUsuario();
    }
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
          'Creado con exito! :)',
          'success'
        );
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

  irPerfiles(){
    this.router.navigate(['perfiles']);
  }

}

