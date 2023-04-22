import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { Router } from '@angular/router';
import { DataApiService } from '../../services/data-api.service';
import Swal from 'sweetalert2';

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
    private dataApiService: DataApiService
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

  async generarCodigoCurso(id: number) {
    await this.dataApiService.getCurso(id.toString()).then(
      (curso) => {
        this.curso = curso;
      }
    );

    if (this.curso.codigo === null) {
      await this.dataApiService.generarCodigoCurso(this.curso).then(
        (respuesta) => {
          //obtengo el curso actualizaco ya con el codigo.
          this.curso = respuesta;
        }
      );
    }
    this.copiarTexto(this.curso.codigo.toString());
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
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataApiService.eliminarCurso(cursoId.toString());
        Swal.fire(
          'Curso Eliminado Excitosamente!',
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
    //the text that is to be copied to the clipboard
    var theText = texto;
    //create our hidden div element
    var hiddenCopy = document.createElement('div');
    //set the innerHTML of the div
    hiddenCopy.innerHTML = theText;
    //set the position to be absolute and off the screen
    hiddenCopy.style.position = 'absolute';
    hiddenCopy.style.left = '-9999px';
    //check and see if the user had a text selection range
    var currentRange;
    if (document.getSelection().rangeCount > 0) {
      //the user has a text selection range, store it
      currentRange = document.getSelection().getRangeAt(0);
      //remove the current selection
      window.getSelection().removeRange(currentRange);
    } else {
      //they didn't have anything selected
      currentRange = false;
    }
    //append the div to the body
    document.body.appendChild(hiddenCopy);
    //create a selection range
    var CopyRange = document.createRange();
    //set the copy range to be the hidden div
    CopyRange.selectNode(hiddenCopy);
    //add the copy range
    window.getSelection().addRange(CopyRange);
    //since not all browsers support this, use a try block
    try {
      //copy the text
      document.execCommand('copy');
    } catch (err) {
      window.alert("Your Browser Doesn't support this! Error : " + err);
    }
    //remove the selection range (Chrome throws a warning if we don't.)
    window.getSelection().removeRange(CopyRange);
    //remove the hidden div
    document.body.removeChild(hiddenCopy);
    //return the old selection range
    if (currentRange) {
      window.getSelection().addRange(currentRange);
    }
    Swal.fire(
      "Codigo de invitacion copiado!",
      "Codigo: " + texto,
      "success"
    )
  }

}
