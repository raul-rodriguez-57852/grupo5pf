import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PlantillaPreguntas } from '../../models/plantilla-preguntas';
import { Pregunta } from '../../models/pregunta';
import { DataApiService } from '../../services/data-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css']
})
export class CrearActividadComponent implements OnInit {

  plantillaPreguntaRespuestas = false;
  paso = 1;
  segundos = 15;
  nombre = null;
  pregunta: Pregunta;
  plantilla: PlantillaPreguntas;
  actividades = null;

  constructor(
    private dataApiService: DataApiService,
    private router: Router) { }

  ngOnInit() {
    this.dataApiService.getActividades().then(res => {
      this.actividades = res;
      console.log(this.actividades);
    });
  }

  crearPreguntasRespuestas() {
    this.plantillaPreguntaRespuestas = true;
    this.plantilla = new PlantillaPreguntas();
  }

  next(formActividad: NgForm) {
    this.paso = 2;
    this.plantilla.nombre = this.nombre;
    this.plantilla.segundos = this.segundos;
    this.plantilla.preguntasDto = [];
    this.pregunta = new Pregunta();
  }

  save(formActividad2: NgForm) {
    this.agregarOtra();
    this.dataApiService.crearActividadPreguntas(this.plantilla).then(res => {
      console.log(res);
    });
  }

  agregarOtra() {
    this.plantilla.preguntasDto.push(this.pregunta);
    console.log('ANTES', this.plantilla);
    this.pregunta = new Pregunta();
    console.log('DESPUÉS', this.plantilla);
  }

  vistaPrevia(id: number) {
    this.router.navigate(['vista-previa-actividad', { id }]);
  }

}
