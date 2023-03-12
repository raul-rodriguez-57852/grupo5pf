import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataApiService } from 'src/app/services/data-api.service';
import { DataTareaService } from 'src/app/services/data-tarea.service';

@Component({
  selector: 'app-estadisticas-profesor',
  templateUrl: './estadisticas-profesor.component.html',
  styleUrls: ['./estadisticas-profesor.component.css']
})
export class EstadisticasProfesorComponent implements OnInit {

  cursos = [];
  nombreCurso = null;
  urlImagenCurso = null;
  id_profesor = null;
  cursoId = null;
  asignaturas = [];
  asignaturaFiltro = null;
  tareas = [];

  tareasFiltradas = [];

  page = 1;
  pageSize = 4;
  collectionSize: number;

  cursoSelected = false;

  id: number;
  mensaje: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataApiService: DataApiService,
    private dataTareaService: DataTareaService
  ) { }

  async ngOnInit() {
    this.id_profesor = this.dataApiService.getUsuario()

    if (this.route.snapshot.paramMap.get("cursoId") != null) {
      this.selectCurso(Number(this.route.snapshot.paramMap.get("cursoId")));
    } else {
      this.getAll();
    }



  }

  async getAll() {
    console.log("ID PROFESOR: ", this.id_profesor)

    await this.dataApiService.getCursosByProfesor(this.id_profesor).then(
      (cursos) => {
        this.cursos = cursos;

      }
    );
    console.log('CURSOS DEL PROFESOR: ', this.dataApiService.getUsuario(), ' : ', this.cursos);
  }

  selectCurso(id: number) {
    this.cursoSelected = true;
    this.cursoId = id;

    this.dataApiService.getCurso(this.cursoId).then((res) => {
      this.nombreCurso = res.nombre;
      this.urlImagenCurso = res.iconoURL;
    });


    this.dataApiService.getAsignaturasByCreador(this.cursoId, this.id_profesor).then((asignaturas) => {
      this.asignaturas = asignaturas;
      this.dataTareaService.getPorcentajeRealizacion(this.cursoId).then((realizaciones) => {
        realizaciones.forEach(element => {
          if (element.porcentajeRealizacion != null) {
            element.porcentajeRealizacion = parseFloat(element.porcentajeRealizacion);
          }
        });

        this.tareas = realizaciones;
        this.tareasFiltradas = this.tareas;
        this.collectionSize = this.tareas.length;

        this.imagenAAsignatura();

      });
    });

  }


  onAsignaturaFilter() {
    if (this.asignaturaFiltro == null) {
      this.tareasFiltradas = this.tareas;
      this.collectionSize = this.tareasFiltradas.length;
      return;
    }

    let filtered = this.tareas.filter(t => t.asignatura == this.asignaturaFiltro.nombre);
    console.log(filtered);
    this.tareasFiltradas = filtered;
    this.collectionSize = this.tareasFiltradas.length;


  }

  // método provisorio luego cambiar
  imagenAAsignatura() {
    this.tareas.forEach(tar => {
      this.asignaturas.forEach(asi => {
        if (tar.asignatura === asi.nombre) {
          tar.iconoURL = asi.iconoURL;
        }
      });
    });
  }

  volverACursos() {
    this.cursoSelected = false;
    this.cursoId = null;
  }

  irADetalle(tareaId: number) {
    this.router.navigate(["estadisticas-tarea", { tareaId: tareaId, cursoId: this.cursoId }]);
  }

  irAEstadisticasPorAlumno() {
    this.router.navigate(["estadisticas-curso-alumno", { cursoId: this.cursoId }]);
  }

  volver() {
    this.router.navigate(["home-profesor", {}]);
  }






}
