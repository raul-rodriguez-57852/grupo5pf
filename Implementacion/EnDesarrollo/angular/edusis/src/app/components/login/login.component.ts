import { Component, OnInit, ElementRef, SystemJsNgModuleLoader } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { Router, UrlHandlingStrategy, ActivatedRoute } from '@angular/router';
import { CompileStylesheetMetadata } from '@angular/compiler';
import { element } from 'protractor';
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
            
            if(user_found != null){
                //console.log("USUARIO ENCONTRADO: ", user_found);
                var esProfe
                await this.dataApiService.isProfesor(user_found).then(
                    (respuesta) =>{
                        esProfe = respuesta;
                    }
                );
    
                if(esProfe){
                    console.log("Es PROFE: ",esProfe)
                    this.router.navigate(['cursos']);
                }
                else{
                    this.router.navigate(['perfiles']);
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
        console.log('Log in!');
        var documento = (<HTMLInputElement>document.getElementById('InputDocumento')).value;
        var clave = (<HTMLInputElement>document.getElementById('inputPassword')).value;
        if(documento == ""){
            //No ingreso documento 
            console.log('Documento Vacio!');
        }

        if( clave == ""){
            //no ingreso password
            console.log('Password Vacia!');
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

            if(session_id != 'wrong_password' && session_id != 'user_not_found'){
                console.log("USUARIO ENCONTRADO! SESSION-ID: ",session_id)
                this.dataApiService.setCookie("SessionCookie",session_id);
                //retrieve coockie.
                  this.retrived_id = this.dataApiService.getCookie("SessionCookie");
                
                
            }
            else{
                console.log(session_id);
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
            //console.log("USUARIO ENCONTRADO: ", user_found);
            var esProfe
            await this.dataApiService.isProfesor(user_found).then(
                (respuesta) =>{
                    esProfe = respuesta;
                }
            );

            if(esProfe){
                console.log("Es PROFE: ",esProfe)
                this.router.navigate(['cursos']);
            }
            else{
                this.router.navigate(['perfiles']);
            }


        }
        
        
    }

    



}
