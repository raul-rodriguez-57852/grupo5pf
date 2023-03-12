import { Component, OnInit, ElementRef } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { Router, UrlHandlingStrategy, ActivatedRoute } from '@angular/router';
import { element, Session } from 'protractor';
import { read } from 'fs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

    mensaje: String;  
    retrived_id: string;
    elemnts = {
        'InputDocumento' : 'div-dni',
        'inputPassword' : 'div-password'
      };
      
    constructor( private dataApiService: DataApiService,private elementRef: ElementRef,private router: Router,private route: ActivatedRoute) {}

    async ngOnInit() {
        this.retrived_id = this.dataApiService.getCookie("SessionCookie");
        if(this.retrived_id != null) {
            var user_found
            await this.dataApiService.validarSession(this.retrived_id).then(
                (respuesta) => {
                     user_found = respuesta;
                }
            );
            var userType = this.retrived_id.slice(this.retrived_id.length - 1);
            if(user_found != null) {
                this.dataApiService.setUser(user_found, userType);
                this.navigateToRightPage(userType);
            }
            else{
                //no match de sesion en la DB.
                this.dataApiService.deleteCookie('SessionCookie');
            }
        }
    }
    
    addFocus(id:string ) {
        document.getElementById(id).classList.add('focus');
        (<HTMLDivElement>document.getElementById(id)).click();
    }

    checkAndGiveFocus(check: string, giveTo: string ) {  
        var elementTocheck = (<HTMLInputElement>document.getElementById(check));
    
        if(elementTocheck.value == null ||elementTocheck.value === '') {
          document.getElementById(this.elemnts[check]).classList.remove('focus');
        }
        
        if (giveTo == '') {
          return;
        }
    
        document.getElementById(giveTo).classList.add('focus');
        document.getElementById(giveTo).click();
    }

    async login() {
        var documento = (<HTMLInputElement>document.getElementById('InputDocumento')).value;
        var clave = (<HTMLInputElement>document.getElementById('inputPassword')).value;
        if(documento == "" || clave == "") {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Debes completar ambos campos.',
                showConfirmButton: false,
                timer: 1500
              })
        }
        //Despues los controles de campos vacios se pueden hacer con angular, desde el html
        if(clave && documento != "") {
            // genero el login
            var session_id;
            await this.dataApiService.inicioSesion(documento, clave).then(
                (respuesta) => {
                    session_id = respuesta;
                }
            );
            
            //el session_id tiene concatenado un valor mas que indica el tipo de usuario. 0 si es tutor e 1 si es profesor.
            var userType = session_id.slice(session_id.length - 1);
            if(session_id != 'wrong_password' && session_id != 'user_not_found') {
                this.dataApiService.setCookie("SessionCookie",session_id);
                //retrieve coockie.
                  this.retrived_id = this.dataApiService.getCookie("SessionCookie");
            }
            else{
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'El usuario y/o contraseña es incorrecto.',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  (<HTMLInputElement>document.getElementById('InputDocumento')).value = null;
                  (<HTMLInputElement>document.getElementById('inputPassword')).value = null;
                  document.getElementById('div-password').classList.remove('focus');
                  document.getElementById('div-dni').classList.remove('focus');
            }
        }
        var user_found
        await this.dataApiService.validarSession(this.retrived_id).then(
            (respuesta) => {
                 user_found = respuesta;
            }
        );
        if(user_found != null) {
            this.dataApiService.setUser(user_found, userType);
            this.navigateToRightPage(userType);
        }
    }

    private navigateToRightPage(userType:string) {
        if (userType == this.dataApiService.getTutorType()) {
            // es tutor.
            this.router.navigate(['perfiles']);
        }
        else{
            //es Profesor
            this.router.navigate(['home-profesor']);
        }
    }

    



}
