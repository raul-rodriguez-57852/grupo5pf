import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantillaVF } from 'src/app/models/plantilla-vf';
import { PreguntaVF } from 'src/app/models/pregunta-vf';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-crear-actividad-vf',
  templateUrl: './crear-actividad-vf.component.html',
  styleUrls: ['./crear-actividad-vf.component.css']
})
export class CrearActividadVfComponent implements OnInit {

  paso = 1;
  segundos = 300;
  nombre = null;
  cantCategorias = 2;

  pregunta: PreguntaVF;
  plantilla: PlantillaVF;
  idTareaRoute = null;
  idCursoRoute = null;


  constructor(
    private dataApiService: DataApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.idTareaRoute =
      this.route.snapshot.paramMap.get('tareaId') != null
        ? Number(this.route.snapshot.paramMap.get('tareaId'))
        : null;
    this.idCursoRoute =
      this.route.snapshot.paramMap.get('cursoId') != null
        ? Number(this.route.snapshot.paramMap.get('cursoId'))
        : null;

    this.plantilla = new PlantillaVF();
    let idProfesor = this.dataApiService.getUsuario();
    this.plantilla.creadorId = idProfesor;
  }

  next(formActividad: NgForm) {
    this.paso = 2;
    this.plantilla.nombre = this.nombre;
    this.plantilla.segundos = this.segundos;
    this.plantilla.preguntaVFDto = [];
    this.pregunta = new PreguntaVF();
    this.pregunta.respuesta = true;

  }

  agregarOtra() {
    this.plantilla.preguntaVFDto.push(this.pregunta);
    console.log('ANTES', this.plantilla);
    this.pregunta = new PreguntaVF();
    this.pregunta.respuesta = true;
    console.log('DESPUÉS', this.plantilla);
  }

  save(formActividad2: NgForm) {
    this.agregarOtra();
    this.dataApiService.crearActividadVF(this.plantilla).then(res => {
      console.log(res);
      /// Si no es nulo this.idTareaRoute significa que se llego a esta pantalla desde la creacion de una tarea. Redirigimos despues de guardar
      if (this.idTareaRoute != null) {
        this.router.navigate([
          "editar-detalle-actividad",
          { tareaId: this.idTareaRoute, cursoId: this.idCursoRoute },
        ]);
      } else {
        this.router.navigate([
          "crear-actividad"
        ]);
      }
    });


  }

}
