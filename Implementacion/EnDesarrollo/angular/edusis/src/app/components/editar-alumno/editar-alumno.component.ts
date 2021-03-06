import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../models/alumno';
import { DataApiService } from '../../services/data-api.service';
import { NgForm } from '@angular/forms';
import { PasswordEmoji } from '../../models/password-emoji';
import { Tutor } from 'src/app/models/tutor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-alumno',
  templateUrl: './editar-alumno.component.html',
  styleUrls: ['./editar-alumno.component.css']
})
export class EditarAlumnoComponent implements OnInit {

  alumno: Alumno = new Alumno();
  mensaje: string = null;
  emojis = [];
  emojisSeleccionados = [];
  avatares = [{ url: 'https://i.imgur.com/VLU8okq.png'},
              { url: 'https://i.imgur.com/s6C5DC9.png'},
              { url: 'https://i.imgur.com/K9aV9cK.png'},
              { url: 'https://i.imgur.com/nynY87C.png'},
              { url: 'https://i.imgur.com/O4NRluf.png'},
              { url: 'https://i.imgur.com/SCNEr9Q.png'},
              { url: 'https://i.imgur.com/q07I5VF.png'},
              { url: 'https://i.imgur.com/Ojaz35C.png'}];
  avatarSeleccionado = null;
  tiposDoc = [];

  constructor(
    private dataApiService: DataApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getEmojis();
    this.getTiposDoc();
    if( this.dataApiService.getUsuario() == null){
      this.mensaje = "Permiso Denegado";
      document.getElementById('open-modal').click();
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

  save(formAlumno: NgForm) {
    
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
    console.log(this.alumno);
    this.dataApiService.guardarAlumno(this.alumno).then(
      (respuesta) => {
        this.mensaje = 'Alumno guardado con éxito.';
        document.getElementById('open-modal').click();
      }
    ).catch(
      (respuesta) => {
        this.mensaje = 'Error al guardar.';
        document.getElementById('open-modal').click();
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

