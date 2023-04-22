import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { Router } from '@angular/router';
import { DataApiService } from '../../services/data-api.service';
import Swal from 'sweetalert2';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  cursos = [];
  curso = null;
  id_profesor = null;

  id: number;

  constructor(
    private router: Router,
    private dataApiService: DataApiService,
    private clipboard: Clipboard
  ) { }

  async ngOnInit() {
    this.id_profesor = this.dataApiService.getUsuario()
    if (this.id_profesor == null || this.dataApiService.getUserType() != this.dataApiService.getProfesorType()) {
      this.router.navigate(['login']);
    }
    this.getAll();
  }

  async getAll() {
    await this.dataApiService.getCursosByProfesor(this.id_profesor).then(
      (cursos) => {
        this.cursos = cursos;
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

  generarCodigoCurso(id: number) {
    console.log(id);
    this.cursos.forEach(async curso => {
      if (curso.id == id) {
        this.curso = curso;
        console.log(curso);
        if (curso.codigo === null) {
          await this.dataApiService.generarCodigoCurso(this.curso).then(
            (respuesta) => {
              //obtengo el curso actualizaco ya con el codigo.
              this.curso = respuesta;
              console.log(this.curso);
            }
          );
        }
        console.log(this.curso.codigo);
        this.copiarTexto(this.curso.codigo);    
      }
    });
  }

  eliminar(cursoId: number, cursoNombre: string) {
    Swal.fire({
      title: 'Desea eliminar al curso:  ' + cursoNombre + '?',
      text: "El curso y toda su informacion se borrara, esta seguro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.dataApiService.eliminarCurso(cursoId.toString());
        Swal.fire(
          'Curso eliminado exitosamente!',
          cursoNombre + ' ha sido eliminado',
          'success'
        );
        this.getAll();
      }
    })
  }

  irACurso(id: number) {
    this.router.navigate(['curso', { id }]);
  }

  volverAHome() {
    this.router.navigate(['home-profesor']);
  }

  recargar() {
  }

  copiarTexto(texto: string) {
    this.clipboard.copy(texto);
    Swal.fire(
      "¡Código de invitación copiado!",
      "Código: " + texto,
      "success"
    )
  }

}
