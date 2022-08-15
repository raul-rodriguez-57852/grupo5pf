import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-vista-previa-vf',
  templateUrl: './vista-previa-vf.component.html',
  styleUrls: ['./vista-previa-vf.component.css']
})
export class VistaPreviaVfComponent implements OnInit {

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

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') != null ? Number(this.route.snapshot.paramMap.get('id')) : null;
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

  volver() {
    this.router.navigate(['crear-actividad']);
  }

}
