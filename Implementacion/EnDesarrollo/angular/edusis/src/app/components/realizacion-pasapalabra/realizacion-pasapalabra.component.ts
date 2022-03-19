import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DataApiService } from "src/app/services/data-api.service";

@Component({
  selector: "app-realizacion-pasapalabra",
  templateUrl: "./realizacion-pasapalabra.component.html",
  styleUrls: ["./realizacion-pasapalabra.component.css"],
})
export class RealizacionPasapalabraComponent {
  @Output() finalizado: EventEmitter<number> = new EventEmitter<number>();

  id = null;
  segundos = null;
  timeLeft: number = null;
  interval;
  preguntas = null;
  preguntaActual = null;
  cantidadPreguntas = null;
  preguntaActualNumero = 0;
  respuestaActual = null;
  respuestasCorrectas = [];
  respuestasIncorrectas = [];
  preguntasRespondidas = 0;
  final = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataApiService: DataApiService
  ) {}

  onInit(id: number) {
    this.id = id;
    this.dataApiService.getActividad(this.id).then(res => {
      console.log(res);
      //this.segundos = res.segundos;
      this.segundos = 35;
      this.timeLeft = this.segundos;
      this.preguntas = res.preguntas;
      this.cantidadPreguntas = this.preguntas.length;
      this.preguntaActual = this.preguntas[this.preguntaActualNumero];
      let element = document.getElementById(this.preguntaActual.letra);
      element.classList.add('item--actual');
      console.log(this.preguntaActual);
      this.startTimer();
    });
  }

  aceptar() {
    let element = document.getElementById(this.preguntaActual.letra);
    if (this.preguntaActual.respuestaCorrecta === this.respuestaActual) {
      this.respuestasCorrectas.push(this.preguntaActual.letra);
      element.classList.remove('item--actual');
      element.classList.add('item--success');
    } else {
      this.respuestasIncorrectas.push(this.preguntaActual.letra);
      element.classList.remove('item--actual');
      element.classList.add('item--failure');
    }
    this.preguntasRespondidas ++;
    this.encontrarSiguientePregunta();
  }

  pasapalabra() {
    this.encontrarSiguientePregunta();
  }

  encontrarSiguientePregunta() {
    let element = document.getElementById(this.preguntaActual.letra);
    element.classList.remove('item--actual');
    if (this.preguntasRespondidas === this.preguntas.length) {
      this.terminar();
      return;
    }
    this.preguntaActualNumero ++;
    this.respuestaActual = '';
    if (this.preguntaActualNumero < this.cantidadPreguntas) {
      this.preguntaActual = this.preguntas[this.preguntaActualNumero];
    } else {
      this.preguntaActualNumero = 0;
      this.preguntaActual = this.preguntas[this.preguntaActualNumero];
    }
    if (this.respuestasCorrectas.includes(this.preguntaActual.letra) || this.respuestasIncorrectas.includes(this.preguntaActual.letra)) {
      this.encontrarSiguientePregunta();
    }
    element = document.getElementById(this.preguntaActual.letra);
    element.classList.add('item--actual');
  }

  terminar() {
    this.final = true;
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.terminar();
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  finalizar() {
    this.final = false;
    this.finalizado.emit(this.respuestasCorrectas.length);
  }

}
