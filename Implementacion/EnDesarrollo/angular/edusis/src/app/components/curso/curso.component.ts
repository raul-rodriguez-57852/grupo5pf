import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataApiService } from '../../services/data-api.service';
import { DataTareaService } from 'src/app/services/data-tarea.service';
import Swal from 'sweetalert2';
import { Asignatura } from 'src/app/models/asignatura';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css'],
})
export class CursoComponent implements OnInit {
  nombre = null;
  imagen = null;
  cursoId = null;
  asignaturas = [];
  tareas = [];
  id: number;
  codigo: string;
  asignaturaSelected = false;
  asignatura: Asignatura = null;
  listadoDeAlumnos = [];
  todaviaNoHayAlumnos = false;
  todaviaNoHayAsignaturas = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataApiService: DataApiService,
    private dataTareaService: DataTareaService
  ) { }

  ngOnInit() {
    this.cursoId =
      this.route.snapshot.paramMap.get('id') != null
        ? Number(this.route.snapshot.paramMap.get('id'))
        : null;
    this.get();

    this.getAllAsignaturas();
    this.getAlumnosDelCurso();
  }

  get() {
    this.dataApiService.getCurso(this.cursoId).then((res) => {
      this.nombre = res.nombre;
      this.imagen = res.imagen;
    });
  }

  async getAlumnosDelCurso() {
    await this.dataApiService.alumnosByCurso(this.cursoId).then((res) => {
      this.listadoDeAlumnos = res;
      this.todaviaNoHayAlumnos = false;
    })
    if (this.listadoDeAlumnos.length == 0) {
      this.todaviaNoHayAlumnos = true;
    }
  }

  async getAllAsignaturas() {
    await this.dataApiService.getAsignaturas(this.cursoId).then((asignaturas) => {
      this.asignaturas = asignaturas;
      this.todaviaNoHayAsignaturas = false;
    });
    if (this.asignaturas.length == 0) {
      this.todaviaNoHayAsignaturas = true;
    }
  }

  async getAllTareas(asignaturaid: number) {
    const colores = [
      '#B5D5C5', '#B08BBB', '#ECA869', '#F5F5DC', '#579BB1', '#82AAE3', '#91D8E4',
      '#FFF6BD', '#FF8E9E', '#ADA2FF', '#227C70', '#FAEAB1', '#FAAB78', '#FFCAC8']
    await this.dataTareaService.getTareaByAsignatura(asignaturaid).then((tareas) => {
      tareas.forEach(tarea => {
        const random = Math.floor(Math.random() * colores.length);
        tarea['color'] = colores[random];
      });
      this.tareas = tareas;
    });
  }

  editar(id: number) {
    this.router.navigate(['editar-asignatura', { id }]);
  }

  editarTarea(id: number) {
    this.router.navigate(['editar-tarea', { id, cursoId: this.cursoId }]);
  }

  setearId(id: number) {
    this.id = id;
  }

  crearAsignatura() {
    this.router.navigate(['editar-asignatura', { cursoId: this.cursoId }]);
  }

  crearTarea() {
    this.router.navigate(['editar-tarea', { cursoId: this.cursoId, asignaturaId: this.asignatura.id }]);
  }

  async seleccionarAsignatura(asignatura: Asignatura) {
    this.asignaturaSelected = true;
    this.asignatura = asignatura;
    await this.getAllTareas(asignatura.id)
  }

  volverACursos() {
    if (this.asignaturaSelected) {
      this.asignaturaSelected = false
    } else {
      this.router.navigate(['cursos']);
    }
  }

  eliminar(id: string, asignaturaNombre: string) {
    Swal.fire({
      title: 'Desea eliminar la  asignatura ' + asignaturaNombre + '?',
      text: "No podras volver atras si deseas eliminar a " + asignaturaNombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.dataApiService.eliminarAsignatura(id);
        Swal.fire(
          'Asignatura Eliminada exitosamente!',
          asignaturaNombre + ' ha sido eliminada',
          'success'
        );
        this.getAllAsignaturas();
      }
    })
  }

  eliminarTarea(tareaId: string, tareaNombre: string) {
    Swal.fire({
      title: 'Desea eliminar la  tarea ' + tareaNombre + '?',
      text: "No podras volver atras si deseas eliminar a " + tareaNombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.dataTareaService.eliminarTarea(tareaId.toString());
        Swal.fire(
          'Tarea Eliminada exitosamente!',
          tareaNombre + ' ha sido eliminada',
          'success'
        );
        this.getAllAsignaturas();
      }
    })
  }

  recargar() {
    // window.location.reload();
  }

  showModal() {
    const bonusContainer = document.getElementById('listado-alumnos-modal');
    bonusContainer.classList.add('show');
  }

  hideModal() {
    const bonusContainer = document.getElementById('listado-alumnos-modal');
    bonusContainer.classList.remove('show');
  }

  showListadoDeAlumnos() {
    this.showModal();
  }

  eliminarAlumno(alumnoNombre: string, alumnoId: string) {
    Swal.fire({
      title: 'Desea eliminar a  ' + alumnoNombre +  ' del curso?',
      text: "No podras volver atras si deseas eliminar a " + alumnoNombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.dataApiService.eliminarAlumnoDelCurso(this.cursoId, alumnoId);
        Swal.fire(
          'Se ha eliminado exitosamente!',
          alumnoNombre + ' ha sido eliminad@',
          'success'
        );
        this.listadoDeAlumnos = [];
        this.getAlumnosDelCurso();
        this.hideModal();
        this.showModal();
      }
    })
  }

  mostrarEstadisticasDelAlumno(alumnoNombre: string, alumnoId: number) {
    this.router.navigate(['estadisticas-curso-alumno', { cursoId: this.cursoId, alumnoId: alumnoId, name: alumnoNombre }])
  }

}
