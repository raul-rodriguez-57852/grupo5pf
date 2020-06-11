import { Component, OnInit } from '@angular/core';
import { Profesor } from '../../models/profesor';
import { NgForm } from '@angular/forms';
import { DataApiService } from '../../services/data-api.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  profesor: Profesor = new Profesor();
  mensaje: string = null;

  constructor(
    private dataApiService: DataApiService
  ) { }

  ngOnInit() {
  }

  save(formRegistro: NgForm) {
    this.dataApiService.guardarProfesor(this.profesor).then(
      (respuesta) => {
        this.mensaje = 'Profesor guardado con éxito.';
        this.recargar();
      }
    ).catch(
      (respuesta) => {
        this.mensaje = 'Error al guardar.';
        document.getElementById('open-modal').click();
      }
    );
  }

  recargar() {
    window.location.reload();
  }

}

