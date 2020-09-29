import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataApiService } from '../../services/data-api.service';

@Component({
  selector: 'app-vista-previa-actividad',
  templateUrl: './vista-previa-actividad.component.html',
  styleUrls: ['./vista-previa-actividad.component.css']
})
export class VistaPreviaActividadComponent implements OnInit {

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

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') != null ? Number(this.route.snapshot.paramMap.get('id')) : null;
    this.dataApiService.getActividad(this.id).then(res => {
      console.log(res);
      this.segundos = res.segundos;
      this.timeLeft = this.segundos;
      this.preguntas = res.preguntas;
      this.cantidadPreguntas = this.preguntas.length;
      this.preguntaActual = this.preguntas[this.preguntaActualNumero];
      this.preguntaActual.respuestas = this.mezclar(this.preguntaActual.respuestas);
      this.startTimer();
    });

  }

  mezclar(array) {
    // tslint:disable-next-line: one-variable-per-declaration
    let currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
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
    this.preguntaActualNumero ++;
    if (respuesta && respuesta.correcta) {
      const audio = new Audio('assets/correcto.mp3');
      audio.play();
      this.respuestasCorrectas ++;
      this.correcto = true;
    } else {
      this.correcto = false;
    }
    this.preguntaActual.respuestas.forEach(element => {
      if (element.correcta) {
        this.revisar(respuesta, element);
      }
    });
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
      this.preguntaActual.respuestas = this.mezclar(this.preguntaActual.respuestas);
      this.startTimer();
    } else {
      this.final = true;
    }
  }

  volver() {
    this.router.navigate(['crear-actividad']);
  }
}
