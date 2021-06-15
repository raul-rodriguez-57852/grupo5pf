import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataApiService } from '../../services/data-api.service';
import { NavbarService } from '../../services/navbar-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  
  esTutor = false;
  nombre_usuario = "Perfil";
  user_logged = true;
  esProfesor = false;

  constructor(private dataApiService: DataApiService, private router: Router, private navbarService: NavbarService) {
    navbarService.data.subscribe(param => {this.recargar();})
  }

  ngOnInit() {
    //this.recargar();
    
  }

  cerrarSesion() {

    var session_id = this.dataApiService.getCookie('SessionCookie');
    this.dataApiService.eliminarSesion(session_id);
    this.user_logged = false;
    this.esTutor = false;
    this.esProfesor = false;
    this.router.navigate(['']);
  }
  
  async recargar() {
    
    //Busco en cookies, para ver si estsa el usuario loggeado, si esta, agarro sus datos, 
    //Si no esta, lo mando a loggearse.
    var session_id = this.dataApiService.getCookie("SessionCookie");
    if( session_id == null){
      return;
    }
    
    var userType = session_id.slice(session_id.length - 1);
    //ya tengo el id de la session, vamos a ver si es valido!
    var user_id;
    await this.dataApiService.validarSession(session_id).then(
      (respuesta) => {
        user_id = respuesta;
      }
      );
      
      if(user_id == null)
      {
        this.user_logged = false;
        //this.router.navigate(['login']);
      }
      else{
        //busco el usuario loggeado!
        this.dataApiService.setUser(user_id,userType);
        if (userType == '0' ){
            // es tutor.
            this.esTutor = true;
            await this.dataApiService.getTutor(user_id).then(
              (respuesta) => {
                this.nombre_usuario = respuesta.nombre;
              }
            );
        }
        else{
            //es Profesor
            this.esProfesor = true;
            await this.dataApiService.getProfesor(user_id).then(
              (respuesta) => {
                this.nombre_usuario = respuesta.nombre;
              }
            );
            }
        
      }

  }
}
