import { Component, OnInit } from "@angular/core";
import { Profesor } from "../../models/profesor";
import { Tutor } from "../../models/tutor";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { DataApiService } from "../../services/data-api.service";
import Swal from "sweetalert2";
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css", '../../../../node_modules/swiper/swiper-bundle.css'],
})

export class RegistroComponent implements OnInit {
  profesor: Profesor = new Profesor();
  tutor: Tutor = new Tutor();
  esCuentaTutor = true;
  swiper: Swiper;
  tiposDoc = [];
  registroExitoso = false;
  button = document.getElementById('button-container')
  tutorSwitch = (<HTMLParagraphElement>document.getElementById('Tutor'))
  profeSwitch = (<HTMLParagraphElement>document.getElementById('Profesor'))
  buttonTrack = (<HTMLDivElement>document.getElementById('my-button'))
  where = (<HTMLInputElement>document.getElementById('for-button'))
  buttonState = true;
  tipoCuenta = 'tutor';
  elemnts = {
    'InputNombre' : 'div-nombre',
    'inputApellido' : 'div-apellido',
    'inputDocumento' : 'div-documento',
    'inputEmail' : 'div-email',
    'inputPassword' : 'div-password'
  };

  constructor(private dataApiService: DataApiService, private router: Router) {
    var id: any;

  }
  ngOnInit() {
    this.getTiposDoc();
    this.swiper = this.getSwipper();
  }

  getTiposDoc() {
    this.dataApiService.getTiposDoc().then((tiposDoc) => {
      this.tiposDoc = tiposDoc;
    });
  }

  async save(formRegistro: NgForm) {
    try {
      this.esCuentaTutor ? this.validateUser(this.tutor) : this.validateUser(this.profesor);
    } catch (missingElements) {
      Swal.fire({
        title: 'Opps :(',
        icon: 'info',
        html:
          '<b>Revisar los siguientes campos: </b>' +
          '<table style="width:100%">' +
              '<tr>' +
              missingElements.join('') +
              '</tr>' +
          '</table>'
      })
      return;
    }
    this.esCuentaTutor ? await this.guardarTutor() : await this.guardarProfesor();
   
    this.registroExitoso ? this.irLogIn() : this.resetForm();
  }

  recargar(id) {
    this.router.navigate(["registro"], { state: { id: id } });
  }

  irLogIn() {
    this.router.navigate(['']);
  }
  
  addFocus(to: string) {
    let allFocusableElements = document.getElementsByClassName('focusable');
    for (let i = 0; allFocusableElements.length > i; i++) {
      if (allFocusableElements[i].classList.contains('focus')) {
        let elementContent = allFocusableElements[i].querySelector('input').value;
        if (elementContent == null || elementContent === '') {
          allFocusableElements[i].classList.remove('focus');
        }
      }
    }
    document.getElementById(to).classList.add('focus');
    document.getElementById(to).click();
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


  private switchTipoDocumento(tipo:string) {
    switch (tipo) {
      case "Libreta Civica": {
        this.esCuentaTutor ? this.tutor.tipoDocumento = "LC" : this.profesor.tipoDocumento = "LC";
        break;
      }
      case "Cedula de Identidad": {
        this.esCuentaTutor ? this.tutor.tipoDocumento = "CI" : this.profesor.tipoDocumento = "CI";
        break;
      }
      case "Libreta de Enrolamiento": {
        this.esCuentaTutor ? this.tutor.tipoDocumento = "LE" : this.profesor.tipoDocumento = "LE";
        break;
      }
      default: {
        break;
      }
    }
  }

  private async guardarTutor() {
    this.switchTipoDocumento(this.tutor.tipoDocumento);
    await this.dataApiService
      .guardarTutor(this.tutor)
      .then((respuesta) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Tutor creado con éxito!',
          showConfirmButton: false,
          timer: 1500
        })
        this.registroExitoso = true;
      })
      .catch((respuesta) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'El usuario no se pudo crear.',
          showConfirmButton: false,
          timer: 2000
        })
      });
    await this.sleep(2000);
  }

  private async guardarProfesor() {
    this.switchTipoDocumento(this.profesor.tipoDocumento); 
     await this.dataApiService
      .guardarProfesor(this.profesor)
      .then((respuesta) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Profesor creado con éxito!',
          showConfirmButton: false,
          timer: 1500
        })
        this.registroExitoso = true;
      })
      .catch((respuesta) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'El usuario no se pudo crear.',
          showConfirmButton: false,
          timer: 2000
        })        
      });
    await this.sleep(2000);
  }

  private resetForm() {
    for (let key in this.elemnts) {
      let value = this.elemnts[key];
      document.getElementById(value).classList.remove('focus');
    }
    window.location.reload();
  }

  private sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private validateUser(user: any) {
    var userType = user instanceof Tutor ? 'tutor' : 'profesor';
    var missingElements = [];
    if (user.nombre === undefined || user.nombre == '' || user.nombre == null || !user.nombre.trim()) {
      
      missingElements.push('<td> Nombre del ' + userType + '. </td><tr></tr>');
    }
    if (user.apellido === undefined ||user.apellido == '' || user.apellido == null || !user.apellido.trim()) {
      missingElements.push('<td> Apellido del ' + userType + '. </td><tr></tr>');
    }
    if (user.documento === undefined || user.documento == '' || user.documento == null || !user.documento.trim() || /\D/.test(user.documento)) {
      missingElements.push('<td> Documento del ' + userType + '. </td><tr></tr>');
    }
    if (user.tipoDocumento === undefined || user.tipoDocumento == '' || user.tipoDocumento == null) {
      missingElements.push('<td> Tipo de Documento del ' + userType + '. </td><tr></tr>');
    }
    if (user.email === undefined || user.email == '' || user.email == null || !user.email.trim()) {
      missingElements.push('<td> Email del ' + userType + '. </td><tr></tr>');
    }
    if (user.password === undefined || user.password == '' || user.password == null || !user.password.trim()) {
      missingElements.push('<td> Contraseña del ' + userType + '. </td><tr></tr>');
    }
    if (missingElements.length > 0) {
      throw missingElements;
    }
  }

  cambiate() {
    this.swiper.slideNext(300);
    const result = document.getElementsByClassName('swiper-slide swiper-slide-visible swiper-slide-active')[0].id;
    if (result == 'profesor') {
      this.tipoCuenta = 'profesor';
      this.esCuentaTutor = false;
    } else {
      this.tipoCuenta = 'tutor';
      this.esCuentaTutor = true;
    }
  }

  getSwipper() {
    register();
    return new Swiper('.swiper', {
      speed: 400,
      loop: true,
      effect: 'flip',
      flipEffect: {
      slideShadows: false,
      },
    });
  }

}

  