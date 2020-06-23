import { Component, OnInit } from '@angular/core';
import { Profesor } from '../../models/profesor';
import { Tutor } from '../../models/tutor';
import { NgForm } from '@angular/forms';
import { DataApiService } from '../../services/data-api.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  profesor: Profesor = new Profesor();
  tutor: Tutor = new Tutor();
  mensaje: string = null;
  esCuentaTutor = true;
  tiposDoc = [];

  constructor(private dataApiService: DataApiService) {}

  ngOnInit() {
    this.getTiposDoc();
  }

  getTiposDoc() {
    this.dataApiService.getTiposDoc().then((tiposDoc) => {
      this.tiposDoc = tiposDoc;
      console.log(this.tiposDoc);
    });
  }

  save(formRegistro: NgForm) {
    if (this.esCuentaTutor) {
      switch (this.tutor.tipoDocumento) {
        case 'Libreta Civica': {
          this.tutor.tipoDocumento = 'LC';
          break;
        }
        case 'Cedula de Identidad': {
          this.tutor.tipoDocumento = 'CI';
          break;
        }
        case 'Libreta de Enrolamiento': {
          this.tutor.tipoDocumento = 'LE';
          break;
        }
        default: {
          break;
        }
      }
      this.dataApiService
        .guardarTutor(this.tutor)
        .then((respuesta) => {
          this.mensaje = 'Profesor guardado con éxito.';
          this.recargar();
        })
        .catch((respuesta) => {
          this.mensaje = 'Error al guardar.';
          document.getElementById('open-modal').click();
        });
    } else {
      switch (this.profesor.tipoDocumento) {
        case 'Libreta Civica': {
          this.profesor.tipoDocumento = 'LC';
          break;
        }
        case 'Cedula de Identidad': {
          this.profesor.tipoDocumento = 'CI';
          break;
        }
        case 'Libreta de Enrolamiento': {
          this.profesor.tipoDocumento = 'LE';
          break;
        }
        default: {
          break;
        }
      }
      this.dataApiService
        .guardarProfesor(this.profesor)
        .then((respuesta) => {
          this.mensaje = 'Profesor guardado con éxito.';
          this.recargar();
        })
        .catch((respuesta) => {
          this.mensaje = 'Error al guardar.';
          document.getElementById('open-modal').click();
        });
    }
  }

  cambiarTipoCuenta() {
    if (this.esCuentaTutor === true) {
      this.esCuentaTutor = false;
    } else {
      this.esCuentaTutor = true;
    }
    this.ngOnInit();
  }

  recargar() {
    window.location.reload();
  }
}
