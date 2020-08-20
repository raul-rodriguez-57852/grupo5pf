import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataApiService } from '../../services/data-api.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  cursos = [];
  id: number;
  mensaje: string;

  constructor(
    private router: Router,
    private dataApiService: DataApiService
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.dataApiService.getCursos().then(
      (cursos) => {
        this.cursos = cursos;
        console.log(this.cursos);
      }
    );
  }

  editar(id: number) {
    this.router.navigate(['editar-curso', { id }]);
  }

  setearId(id: number) {
    this.id = id;
  }

  crear() {
    this.router.navigate(['editar-curso']);
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

  irACurso(id: number) {
    this.router.navigate(['curso', { id }]);
  }

  recargar() {
    // window.location.reload();
  }
}
