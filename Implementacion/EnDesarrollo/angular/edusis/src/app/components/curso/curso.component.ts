import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataApiService } from '../../services/data-api.service';
import { DataTareaService } from 'src/app/services/data-tarea.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css'],
})
export class CursoComponent implements OnInit {
  nombre = null;
  urlImagen = null;
  cursoId = null;
  asignaturas = [];
  tareas = [];
  id: number;
  mensaje: string;
  codigo: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataApiService: DataApiService,
    private dataTareaService: DataTareaService
  ) {}

  ngOnInit() {
    this.cursoId =
      this.route.snapshot.paramMap.get('id') != null
        ? Number(this.route.snapshot.paramMap.get('id'))
        : null;
        
    this.get();
    
    this.getAll();
   
  }

  get() {
    
    this.dataApiService.getCurso(this.cursoId).then((res) => {
      this.nombre = res.nombre;
      this.urlImagen = res.iconoURL;
    });
  }

  getAll() {
    this.dataApiService.getAsignaturas(this.cursoId).then((asignaturas) => {
      this.asignaturas = asignaturas;
      console.log(this.asignaturas);
    });
    this.dataTareaService.getTareas(this.cursoId).then((tareas) => {
      this.tareas = tareas;
      console.log(this.tareas);
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
    this.router.navigate(['editar-tarea', { cursoId: this.cursoId }]);
  }

  eliminar() {
    /*this.dataApiService.elimi(this.id.toString()).then(
      (respuesta) => {
        this.recargar();
      }
    ).catch(
      (respuesta) => {
        this.mensaje = 'Error al eliminar el curso.';
        document.getElementById('open-modal').click();
      }
    );*/
  }

  recargar() {
    // window.location.reload();
  }
}
