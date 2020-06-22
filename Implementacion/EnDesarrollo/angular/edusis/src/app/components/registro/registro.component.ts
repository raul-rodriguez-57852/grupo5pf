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

  constructor(private dataApiService: DataApiService) {}

  ngOnInit() {}

  save(formRegistro: NgForm) {
    if (this.esCuentaTutor) {
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
