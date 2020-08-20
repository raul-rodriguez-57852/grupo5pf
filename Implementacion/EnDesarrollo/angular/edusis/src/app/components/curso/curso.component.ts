import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataApiService } from '../../services/data-api.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  nombre = null;
  cursoId = null;
  asignaturas = [];
  id: number;
  mensaje: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataApiService: DataApiService
  ) { }

  ngOnInit() {
    this.cursoId = this.route.snapshot.paramMap.get('id') != null ? Number(this.route.snapshot.paramMap.get('id')) : null;
    this.get();
    this.getAll();
  }

  get() {
    this.dataApiService.getCurso(this.cursoId).then(res => {
      this.nombre = res.nombre;
    });
  }

  getAll() {
    this.dataApiService.getAsignaturas(this.cursoId).then(
      (asignaturas) => {
        this.asignaturas = asignaturas;
        console.log(this.asignaturas);
      }
    );
  }

  editar(id: number) {
    this.router.navigate(['editar-asignatura', { id }]);
  }

  setearId(id: number) {
    this.id = id;
  }

  crear() {
    this.router.navigate(['editar-asignatura', { cursoId: this.cursoId }]);
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
