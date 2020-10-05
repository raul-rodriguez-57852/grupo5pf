import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataApiService } from '../../services/data-api.service';

@Component({
  selector: 'app-vista-previa-pasapalabra',
  templateUrl: './vista-previa-pasapalabra.component.html',
  styleUrls: ['./vista-previa-pasapalabra.component.css']
})
export class VistaPreviaPasapalabraComponent implements OnInit {

  id = null;
  preguntas = null;
  preguntaActual = null;
  cantidadPreguntas = null;
  preguntaActualNumero = 0;
  respuestaActual = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataApiService: DataApiService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') != null ? Number(this.route.snapshot.paramMap.get('id')) : null;
    this.dataApiService.getActividad(this.id).then(res => {
      console.log(res);
      this.preguntas = res.preguntas;
      this.cantidadPreguntas = this.preguntas.length;
      this.preguntaActual = this.preguntas[this.preguntaActualNumero];
      console.log(this.preguntaActual);
    });
  }

  aceptar() {
    let element = document.getElementById(this.preguntaActual.letra);
    if (this.preguntaActual.respuestaCorrecta === this.respuestaActual) {
      element.classList.add('item--success');
      this.preguntaActualNumero ++;
      this.respuestaActual = '';
      if (this.preguntaActualNumero < this.cantidadPreguntas) {
        this.preguntaActual = this.preguntas[this.preguntaActualNumero];
      }
    } else {
      element.classList.add('item--failure');
      this.preguntaActualNumero ++;
      this.respuestaActual = '';
      if (this.preguntaActualNumero < this.cantidadPreguntas) {
        this.preguntaActual = this.preguntas[this.preguntaActualNumero];
      }
    }
  }

  pasapalabra() {
    this.preguntaActualNumero ++;
    this.respuestaActual = '';
    if (this.preguntaActualNumero < this.cantidadPreguntas) {
      this.preguntaActual = this.preguntas[this.preguntaActualNumero];
    }
  }

}
