import { Component, OnInit, ElementRef } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { PasswordEmoji } from '../../models/password-emoji';
import { Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { NavbarService } from '../../services/navbar-service';
import { Tutor } from 'src/app/models/tutor';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit {
  alumno: Alumno = new Alumno();
  perfiles = [];
  perfilSeleccionado = null;
  emojis = [];
  emojisSeleccionados = [];
  mensaje = null;

  constructor(
    private dataApiService: DataApiService,
    private elementRef: ElementRef,
    private router: Router,
    private navbarService: NavbarService
  ) { }

  ngOnInit() {
    this.getAlumnos();
    this.getEmojis();
    this.navbarService.triggerNavbarGet();
  }

  actualizarAddons() {
    this.perfiles.forEach(alumno => {
      alumno.listRecompensasComprada = [];
      alumno.listRecompensasEquipada = [];
      this.dataApiService.getRecompensasAlumno(alumno.id.toString()).then(
        (respuesta) => {
          let map = respuesta;
          map.forEach(recompensa => {
            if (recompensa.equipado) {
              alumno.listRecompensasEquipada.push(recompensa.addon);
            } else {
              alumno.listRecompensasComprada.push(recompensa.addon);
            }
          });
        }
      )        
    });
  }

  getEmojis() {
    this.dataApiService.getEmojis().then((respuesta) => {
      this.emojis = respuesta;
    });
  }

  async getAlumnos() {
    let tutor;
    if(this.dataApiService.getUserType() == this.dataApiService.getAlumnoType()){
        await this.dataApiService.tutorByAlumno(this.dataApiService.getUsuario()).then(
          (respuesta) => {
            tutor = respuesta;
          }
        );
        
        await this.dataApiService.setUser(tutor.id.toString(), this.dataApiService.getTutorType());
        this.dataApiService.deleteCookie(this.dataApiService.studentCookie);
    }
    await this.dataApiService.alumnosByTutor(this.dataApiService.getUsuario()).then(
      (respuesta) => {
        this.perfiles = respuesta;
      }
    );
    this.actualizarAddons();
    //Lets try adding an empty profile 
    this.alumno.nombre = 'Nuevo Alumno';
    this.alumno.avatarUrl = 'assets/img/emptyPerfil.png';    
    this.perfiles.push(this.alumno);
  }

  seleccionarPerfil(perfil: any) {
    this.perfilSeleccionado = perfil;
    if (perfil.id == null){
      this.router.navigate(['editar-alumno']);
    }
  }

  addEmoji(emoji: any) {
    if (this.emojisSeleccionados.length < 3) {
      this.emojisSeleccionados.push(emoji);
    }
  }

  clearEmoji() {
    this.emojisSeleccionados.pop();
  }

  ingresoAlumno() {
    if (this.emojisSeleccionados.length === 3) {
      const pwd = new PasswordEmoji();
      var thisId = this.perfilSeleccionado.id.toString();
      
      pwd.emoji1Id = Number(this.emojisSeleccionados[0].id);
      pwd.emoji2Id = Number(this.emojisSeleccionados[1].id);
      pwd.emoji3Id = Number(this.emojisSeleccionados[2].id);
      this.dataApiService.ingresoAlumno(this.perfilSeleccionado.id.toString(), pwd).then(
        (respuesta) => {
          this.dataApiService.setUser(thisId, this.dataApiService.getAlumnoType());
          this.dataApiService.setCookie(this.dataApiService.studentCookie, thisId);
          this.router.navigate(['home-alumno'], {state: {id: thisId}});
        }
      ).catch(
        (respuesta) => {
          //Se puede poner el dog guard
          Swal.fire(
            'Upss',
            'Emojis incorrectos :(',
            'warning'
        );
          this.emojisSeleccionados = [];
        }
      );
    }
  }

  recargar() {
    this.emojisSeleccionados = [];
    this.perfilSeleccionado = null;
  }

  volverAPerfiles(){
    this.perfilSeleccionado = null;
  }

  
}
