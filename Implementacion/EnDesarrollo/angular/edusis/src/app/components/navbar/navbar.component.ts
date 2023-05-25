
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
  user_logged = true;
  esProfesor = false;
  esAlumno = false;

  constructor(private dataApiService: DataApiService, private router: Router, private navbarService: NavbarService) {
    navbarService.data.subscribe(param => {this.recargar();})
  }

  ngOnInit() {
    //this.recargar();
  }

  cerrarSesion() {
    if (this.dataApiService.getUserType() != this.dataApiService.getAlumnoType()) {
      var session_id = this.dataApiService.getCookie('SessionCookie');
      this.dataApiService.eliminarSesion(session_id);
      this.user_logged = false;
      this.esTutor = false;
      this.esProfesor = false;
      this.esAlumno = false;
      this.dataApiService.deleteCookie(this.dataApiService.studentCookie);
      this.router.navigate(['login']);
    } else {
      this.cerrarSessionAlumno();
    }
    
  }

  irAPerfiles() {
    this.dataApiService.deleteCookie(this.dataApiService.studentCookie);
    this.router.navigate(['perfiles'])
  }

  userExists() {
    return this.dataApiService.getUsuario() != null;
  }

  cerrarSessionAlumno() {
    this.esAlumno = false;
    this.esTutor = true;
    this.dataApiService.deleteCookie(this.dataApiService.studentCookie);
    this.router.navigate(['perfiles'])
  }
    
  async recargar() {
    if (this.userExists()) {
      this.showCorrectNavbar(this.dataApiService.getUserType());
    } else {
      //Busco en cookies, para ver si estsa el usuario loggeado, si esta, agarro sus datos, 
      //Si no esta, lo mando a loggearse.
      var session_id = this.dataApiService.getCookie("SessionCookie");
      if (session_id == null) {
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
      
        if (user_id == null) {
          this.user_logged = false;
          //this.router.navigate(['login']);
        }
        else {
          //busco el usuario loggeado!
          var userID = this.dataApiService.getUsuario() ? this.dataApiService.getUsuario(): user_id;
          var userTYPE = this.dataApiService.getUserType() ? this.dataApiService.getUserType(): userType;
          this.dataApiService.setUser(userID , userTYPE);
          this.showCorrectNavbar(userTYPE);
        }
    }
    
  }

  showCorrectNavbar(userType: string) {
    switch(userType) {
      case this.dataApiService.getProfesorType(): {
        this.esProfesor = true;
        this.esTutor = false;
        this.esAlumno = false
        break;
      }

      case this.dataApiService.getTutorType(): {
        this.esTutor = true;
        this.esProfesor = false;
        this.esAlumno = false;
        break;
      }

      case this.dataApiService.getAlumnoType(): {
        this.esAlumno = true;
        this.esProfesor = false;
        this.esTutor = false;
        break;
      }
    }
  }
}
