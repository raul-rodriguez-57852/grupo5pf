import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-realizacion-vf',
  templateUrl: './realizacion-vf.component.html',
  styleUrls: ['./realizacion-vf.component.css']
})
export class RealizacionVfComponent {
  @Output() finalizado: EventEmitter<number> = new EventEmitter<number>();

  id = null;

  segundos = null;
  timeLeft: number = null;
  interval;
  preguntas = null;
  cantidadPreguntas = null;
  preguntaActual = null;
  preguntaActualNumero = 0;

  revision = false;
  correcto = false;
  opcionElegida = null;
  opcionCorrecta = null;

  respuestasCorrectas = 0;
  final = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataApiService: DataApiService
  ) { }

  onInit(id: number) {
    this.id = id;
    this.final = false;
    this.dataApiService.getActividad(this.id).then(res => {
      console.log(res);
      this.segundos = res.segundos;
      this.timeLeft = this.segundos;
      this.preguntas = res.preguntas;
      this.cantidadPreguntas = this.preguntas.length;
      this.preguntaActual = this.preguntas[this.preguntaActualNumero];
      this.startTimer();
    });
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.opcion(null);
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  opcion(respuesta: any) {
    this.pauseTimer();
    this.preguntaActualNumero++;
    if (this.preguntaActual.respuesta == respuesta) {
      const audio = new Audio('assets/correcto.mp3');
      audio.play();
      this.respuestasCorrectas++;
      this.correcto = true;
    } else {
      this.correcto = false;
    }
    this.revisar(respuesta, this.preguntaActual.respuesta);

  }

  revisar(elegida: any, correcta: any) {
    this.revision = true;
    this.opcionElegida = elegida;
    this.opcionCorrecta = correcta;
  }

  continuar() {
    this.revision = false;
    this.opcionElegida = null;
    this.opcionCorrecta = null;
    if (this.preguntaActualNumero < this.cantidadPreguntas) {
      this.timeLeft = this.segundos;
      this.preguntaActual = this.preguntas[this.preguntaActualNumero];
      this.startTimer();
    } else {
      this.final = true;
    }
  }

  finalizar() {
    this.revision = false;
    this.final = false;
    this.finalizado.emit(this.respuestasCorrectas);
  }

}
