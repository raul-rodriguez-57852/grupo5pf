import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataApiService } from '../../services/data-api.service';

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

  constructor(private dataApiService: DataApiService, private router: Router) {}

  ngOnInit() {
    



  }

  async recargar() {
    //Busco en cookies, para ver si estsa el usuario loggeado, si esta, agarro sus datos, 
    //Si no esta, lo mando a loggearse.
    var session_id = this.dataApiService.getCookie("SessionCookie");
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
        var esProfe;
        await this.dataApiService.isProfesor(user_id).then(
          (respuesta) =>{
             esProfe = respuesta;
          }
        );
        if(esProfe){
          this.esProfesor = true;
          await this.dataApiService.getProfesor(user_id).then(
            (respuesta) => {
              this.nombre_usuario = respuesta.nombre;
            }
          );
          
        }
        else{
          this.esTutor = true;
          await this.dataApiService.getTutor(user_id).then(
            (respuesta) => {
              this.nombre_usuario = respuesta.nombre;
            }
          );
        }
        
      }

    /*
    console.log('AHORA ENTRÓ');
    if (this.dataApiService.usuario != null) {
      if (this.dataApiService.usuario.nombre === 'Manuel') {
        this.profeLog = true;
        this.tutorLog = false;
      }
      if (this.dataApiService.usuario.nombre === 'Tutor') {
        this.tutorLog = true;
        this.profeLog = false;
      }

    }
    */
  }
}
