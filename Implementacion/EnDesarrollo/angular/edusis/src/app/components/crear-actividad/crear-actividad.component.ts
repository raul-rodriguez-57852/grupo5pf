import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PlantillaPreguntas } from '../../models/plantilla-preguntas';
import { Pregunta } from '../../models/pregunta';
import { DataApiService } from '../../services/data-api.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  idTareaRoute = null;

  constructor(
    private dataApiService: DataApiService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {

    this.idTareaRoute =
      this.route.snapshot.paramMap.get('tareaId') != null
        ? Number(this.route.snapshot.paramMap.get('tareaId'))
        : null;


    let idProfesor = this.dataApiService.getUsuario();
    this.dataApiService.getActividadesByProfesor(idProfesor).then(res => {
      this.actividades = res;
    });
  }

  crearPreguntasRespuestas() {
    this.plantillaPreguntaRespuestas = true;
    this.plantilla = new PlantillaPreguntas();
    let idProfesor = this.dataApiService.getUsuario();
    this.plantilla.creadorId = idProfesor;
  }

  crearPasapalabra() {
    if (this.idTareaRoute != null) {
      this.router.navigate([
        "crear-actividad-pasapalabra",
        { tareaId: this.idTareaRoute },
      ]);
    } else {
      this.router.navigate(['crear-actividad-pasapalabra']);
    }

  }

  crearGrilla() {
    if (this.idTareaRoute != null) {
      this.router.navigate([
        "crear-actividad-grilla",
        { tareaId: this.idTareaRoute },
      ]);
    } else {
      this.router.navigate(['crear-actividad-grilla']);
    }

  }

  crearCategorias() {
    if (this.idTareaRoute != null) {
      this.router.navigate([
        "crear-actividad-categorias",
        { tareaId: this.idTareaRoute },
      ]);
    } else {
      this.router.navigate(['crear-actividad-categorias']);
    }

  }

  crearVF() {
    if (this.idTareaRoute != null) {
      this.router.navigate([
        "crear-actividad-vf",
        { tareaId: this.idTareaRoute },
      ]);
    } else {
      this.router.navigate(['crear-actividad-vf']);
    }

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
      /// Si no es nulo this.idTareaRoute significa que se llego a esta pantalla desde la creacion de una tarea. Redirigimos despues de guardar
      if (this.idTareaRoute != null) {
        this.router.navigate([
          "editar-detalle-actividad",
          { tareaId: this.idTareaRoute },
        ]);
      } else {
        window.location.reload();
      }
    });


  }

  agregarOtra() {
    this.plantilla.preguntasDto.push(this.pregunta);
    this.pregunta = new Pregunta();
  }

  vistaPrevia(actividad: any) {
    if (actividad.tipo === 'Preguntas') {
      const id = actividad.id;
      this.router.navigate(['vista-previa-actividad', { id }]);
    }
    if (actividad.tipo === 'Pasapalabra') {
      const id = actividad.id;
      this.router.navigate(['vista-previa-pasapalabra', { id }]);
    }
    if (actividad.tipo === 'Grilla') {
      const id = actividad.id;
      this.router.navigate(['vista-previa-grilla', { id }]);
    }
    if (actividad.tipo === 'Categorias') {
      const id = actividad.id;
      this.router.navigate(['vista-previa-categorias', { id }]);
    }
    if (actividad.tipo === 'VerdaderoFalso') {
      const id = actividad.id;
      this.router.navigate(['vista-previa-vf', { id }]);
    }
  }

  volver() {
    this.router.navigate(["home-profesor", {}]);
  }

}
