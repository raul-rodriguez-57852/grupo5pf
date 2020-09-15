import { Component, OnInit, ElementRef, SystemJsNgModuleLoader } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { Router, UrlHandlingStrategy, ActivatedRoute } from '@angular/router';
import { CompileStylesheetMetadata } from '@angular/compiler';
import { element } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

    constructor( private dataApiService: DataApiService,private elementRef: ElementRef,private router: Router,private route: ActivatedRoute)
    {
        

    }

    ngOnInit(){

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

   test(){
       console.log('Tocaste el numero de documento!');
   }



}

