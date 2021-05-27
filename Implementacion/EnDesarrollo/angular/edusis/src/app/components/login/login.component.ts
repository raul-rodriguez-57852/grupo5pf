import { Component, OnInit, ElementRef, SystemJsNgModuleLoader } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { Router, UrlHandlingStrategy, ActivatedRoute } from '@angular/router';
import { CompileStylesheetMetadata } from '@angular/compiler';
import { element, Session } from 'protractor';
import { read } from 'fs';
import { Variable } from '@angular/compiler/src/render3/r3_ast';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

    mensaje: String;  
    retrived_id: string;
      
    constructor( private dataApiService: DataApiService,private elementRef: ElementRef,private router: Router,private route: ActivatedRoute)
    {
        

    }

    async ngOnInit(){
        this.retrived_id = this.dataApiService.getCookie("SessionCookie");
        if(this.retrived_id != null){
            var user_found
            //console.log("Veamos si la cookie es valida o no!");
            await this.dataApiService.validarSession(this.retrived_id).then(
                (respuesta) => {
                     user_found = respuesta;
                }
            );
            var userType = this.retrived_id.slice(this.retrived_id.length - 1);
            if(user_found != null){
                this.dataApiService.setUser(user_found,userType);
                if (userType == '0' ){
                    // es tutor.
                    this.router.navigate(['perfiles']);
                }
                else{
                    //es Profesor
                    this.router.navigate(['home-profesor']);
                }
                
            }

        }

    }


    addFocus(id:string ){
        document.getElementById(id).classList.add('focus');
    }

    removeFocus(){

        if((<HTMLInputElement>document.getElementById('InputDocumento')).value == ""){
            document.getElementById('div-dni').classList.remove('focus');
        }
        if((<HTMLInputElement>document.getElementById('inputPassword')).value == ""){
            document.getElementById('div-password').classList.remove('focus');
        }  
    }

    async login(){
        var documento = (<HTMLInputElement>document.getElementById('InputDocumento')).value;
        var clave = (<HTMLInputElement>document.getElementById('inputPassword')).value;
        if(documento == ""){
            //No ingreso documento 
            console.log('Documento Vacio!');
            this.mensaje = 'Documento Vacio!';
            document.getElementById('open-modal').click();
        }

        if( clave == ""){
            //no ingreso password
            console.log('Password Vacia!');
            this.mensaje = 'Password Vacia!';
            document.getElementById('open-modal').click();
        }
        

        //Despues los controles de campos vacios se pueden hacer con angular, desde el html
        if(clave && documento != ""){
            // genero el login
            var session_id;
            await this.dataApiService.inicioSesion(documento, clave).then(
                (respuesta) =>{
                    session_id = respuesta;
                }
            );
            
            //el session_id tiene concatenado un valor mas que indica el tipo de usuario. 0 si es tutor e 1 si es profesor.
            var userType = session_id.slice(session_id.length - 1);
            if(session_id != 'wrong_password' && session_id != 'user_not_found'){
                this.dataApiService.setCookie("SessionCookie",session_id);
                //retrieve coockie.
                  this.retrived_id = this.dataApiService.getCookie("SessionCookie");
            }
            else{
                
                console.log(session_id);
                if(session_id == 'wrong_password'){
                    this.mensaje = 'Contraseña incorrecta';
                }
                if(session_id == 'user_not_found'){
                    this.mensaje = 'El usuario ingresado no existe. Si desea crear una nueva cuenta toque el boton Registrate.';
                }
                document.getElementById('open-modal').click();
            }
        }

        //console.log("Cookie Encontrada: ", retrived_id);
        var user_found
        //console.log("Veamos si la cookie es valida o no!");
        await this.dataApiService.validarSession(this.retrived_id).then(
            (respuesta) => {
                 user_found = respuesta;
            }
        );
        
        if(user_found != null){
            
            this.dataApiService.setUser(user_found, userType);
            if (userType == '0' ){
                // es tutor.
                this.router.navigate(['perfiles']);
            }
            else{
                //es Profesor
                this.router.navigate(['home-profesor']);
            }

        }
        
        
    }

    



}
