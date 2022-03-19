import { Component, OnInit } from "@angular/core";
import { Profesor } from "../../models/profesor";
import { Tutor } from "../../models/tutor";
import { NgForm, SelectMultipleControlValueAccessor } from "@angular/forms";
import { Router } from "@angular/router";
import { DataApiService } from "../../services/data-api.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"],
})
export class RegistroComponent implements OnInit {
  profesor: Profesor = new Profesor();
  tutor: Tutor = new Tutor();
  mensaje: string = null;
  esCuentaTutor = true;
  tiposDoc = [];
  registroExitoso = false;

  constructor(private dataApiService: DataApiService, private router: Router) {
    var id: any;

  }
  ngOnInit() {
    this.getTiposDoc();
  }

  getTiposDoc() {
    this.dataApiService.getTiposDoc().then((tiposDoc) => {
      this.tiposDoc = tiposDoc;
    });
  }

  async save(formRegistro: NgForm) {
    if (this.esCuentaTutor) {
      await this.guardarTutor();
    } 
    else {
      await this.guardarProfesor();
    }
    this.registroExitoso ? this.irLogIn() : this.resetForm();
  }

  cambiarTipoCuenta(tipo: string) {
    if (tipo === this.dataApiService.getTutorType()) {
      this.esCuentaTutor = true;
    } else {
      this.esCuentaTutor = false;
    }
    this.ngOnInit();
  }

  recargar(id) {
    this.router.navigate(["registro"], { state: { id: id } });
  }

  irLogIn(){
    this.router.navigate(['']);
    }
  
  addFocus(id:string ){
      document.getElementById(id).classList.add('focus');
      document.getElementById(id).click();
  }

  removeFocus(){

      if((<HTMLInputElement>document.getElementById('InputNombre')).value == "") {
          document.getElementById('div-nombre').classList.remove('focus');
      }
      if((<HTMLInputElement>document.getElementById('inputApellido')).value == "") {
          document.getElementById('div-apellido').classList.remove('focus');
      }  
      if((<HTMLInputElement>document.getElementById('inputEmail')).value == "") {
        document.getElementById('div-email').classList.remove('focus');
      }
      if((<HTMLInputElement>document.getElementById('inputPassword')).value == "") {
        document.getElementById('div-password').classList.remove('focus');
      }   
      if((<HTMLInputElement>document.getElementById('inputDocumento')).value == "") {
        document.getElementById('div-documento').classList.remove('focus');
      } 
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

  private  async guardarTutor() {
    this.switchTipoDocumento(this.tutor.tipoDocumento);
    await this.dataApiService
      .guardarTutor(this.tutor)
      .then((respuesta) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Tutor creado con exito!',
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
          title: 'Profesor creado con exito!',
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
    window.location.reload();
  }

  private sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

  