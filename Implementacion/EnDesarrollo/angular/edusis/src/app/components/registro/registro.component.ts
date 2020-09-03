import { Component, OnInit } from '@angular/core';
import { Profesor } from '../../models/profesor';
import { Tutor } from '../../models/tutor';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private dataApiService: DataApiService, private router: Router) {
    var id: any;
    
    if(this.router.getCurrentNavigation().extras.state.id != 3)
    {
      if (this.router.getCurrentNavigation().extras.state.id == 1)
      {
        this.esCuentaTutor = false;
      }
      else
      {
        this.esCuentaTutor = true;
      }
      console.log(this.router.getCurrentNavigation().extras.state.id); 
    }
  }
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
          this.mensaje = 'Cuenta creada con éxito.';
          document.getElementById('open-modal').click();
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
          this.mensaje = 'Cuenta creada con éxito.';
          document.getElementById('open-modal').click();
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

  recargar(id) {
    this.router.navigate(['registro'], {state: {id: id}});
  }
}
