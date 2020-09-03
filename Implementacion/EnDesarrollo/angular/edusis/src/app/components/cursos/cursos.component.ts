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
  curso = null;

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

  generarCodigoCurso(id: number){
    console.log('ID = ', id);
    
    this.dataApiService.getCurso(id.toString()).then(
      (curso) => {
        this.curso = curso;
        console.log('curso.id = ',this.curso.id);
        /*
        console.log('curso.id = ',this.curso.id);
        console.log('curso.nombre = ',this.curso.nombre);
        console.log('curso.codigo = ',this.curso.codigo);
        console.log('curso.iconoUrL = ',this.curso.iconoURL);
        console.log('curso.creador = ',this.curso.creador);
        */
        if(this.curso.codigo === null){
          console.log('Codigo Null');
          this.curso = this.dataApiService.generarCodigoCurso(curso).then(
            (respuesta) => {
              this.curso = curso
            }
          )

         
        }
        
        
      }
    );
    //this.mensaje = "Codigo de invitacion al curso!";
    
    //document.getElementById('open-modal-codigo-curso').click();
    
    this.dataApiService.getCurso(id.toString()).then(
      (curso) => {
        this.curso = curso;
        console.log('CODIGO DE INVITACION! = ',this.curso.codigo);
      }
    )

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
