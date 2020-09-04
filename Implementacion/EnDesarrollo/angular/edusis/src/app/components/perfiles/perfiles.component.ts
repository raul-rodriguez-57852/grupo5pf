import { Component, OnInit, ElementRef } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { PasswordEmoji } from '../../models/password-emoji';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit {

  perfiles = [];
  perfilSeleccionado = null;
  emojis = [];
  emojisSeleccionados = [];
  mensaje = null;

  constructor(
    private dataApiService: DataApiService,
    private elementRef: ElementRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAlumnos();
    this.getEmojis();
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#53ACAB';
  }

  getEmojis() {
    this.dataApiService.getEmojis().then((respuesta) => {
      this.emojis = respuesta;
      console.log(this.emojis);
    });
  }

  getAlumnos() {
    this.dataApiService.getAlumnos().then((respuesta) => {
      this.perfiles = respuesta;
      console.log(respuesta);
    });
  }

  seleccionarPerfil(perfil: any) {
    this.perfilSeleccionado = perfil;
  }

  addEmoji(emoji: any) {
    if (this.emojisSeleccionados.length < 3) {
      this.emojisSeleccionados.push(emoji);
    }
  }

  ingresoAlumno() {
    if (this.emojisSeleccionados.length === 3) {
      const pwd = new PasswordEmoji();
      pwd.emoji1Id = Number(this.emojisSeleccionados[0].id);
      pwd.emoji2Id = Number(this.emojisSeleccionados[1].id);
      pwd.emoji3Id = Number(this.emojisSeleccionados[2].id);
      this.dataApiService.ingresoAlumno(this.perfilSeleccionado.id.toString(), pwd).then(
        (respuesta) => {
          this.mensaje = 'Iniciaste sesión correctamente';
          document.getElementById('open-modal').click();
        }
      ).catch(
        (respuesta) => {
          this.mensaje = 'Contraseña incorrecta';
          document.getElementById('open-modal').click();
        }
      );
    }
  }

  nuevoalumno(){
    this.router.navigate(['editar-alumno']);
  }

  recargar() {
    window.location.reload();
  }

}
