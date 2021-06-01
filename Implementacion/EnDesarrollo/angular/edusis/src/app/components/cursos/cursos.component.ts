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
  id_profesor = null;

  id: number;
  mensaje: string;


  constructor(
    private router: Router,
    private dataApiService: DataApiService
  ) { }

  async ngOnInit() {
    this.id_profesor = this.dataApiService.getUsuario()
      if(this.id_profesor == null || this.dataApiService.getUserType() != 1)
      {
        this.router.navigate(['login']);
      }

    this.getAll();
  
  }

  async getAll() {
    console.log("ID PROFESOR: ",this.id_profesor)

      await this.dataApiService.getCursosByProfesor(this.id_profesor).then(
      (cursos) => {
        this.cursos = cursos;
        
        
      }
    );
    console.log('CURSOS DEL PROFESOR: ',this.dataApiService.getUsuario(),' : ', this.cursos);
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

  async generarCodigoCurso(id: number){
    console.log('ID = ', id);
    await this.dataApiService.getCurso(id.toString()).then(
      (curso) => {
        this.curso = curso;
      }
    );

    if(this.curso.codigo === null){
      //console.log('Codigo Null');
      await this.dataApiService.generarCodigoCurso(this.curso).then(
        (respuesta) => {
          //obtengo el curso actualizaco ya con el codigo.
          this.curso = respuesta;
        }
      ).catch((respuesta) => {
        this.mensaje = "Error al generar Codigo.";
        document.getElementById("open-modal").click();
      });
    }
    console.log('CODIGO DE INVITACION! = ',this.curso.codigo);
    this.copiarTexto(this.curso.codigo.toString());
  }

  copiarTexto(texto: string){
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
            if(document.getSelection().rangeCount > 0)
            {
                //the user has a text selection range, store it
                currentRange = document.getSelection().getRangeAt(0);
                //remove the current selection
                window.getSelection().removeRange(currentRange);
            }
            else
            {
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
          try
          {
                //copy the text
                document.execCommand('copy');
          }
          catch(err)
          {
              window.alert("Your Browser Doesn't support this! Error : " + err);
          }
          //remove the selection range (Chrome throws a warning if we don't.)
          window.getSelection().removeRange(CopyRange);
          //remove the hidden div
          document.body.removeChild(hiddenCopy);
          //return the old selection range
          if(currentRange)
          {
                window.getSelection().addRange(currentRange);
          }
          alert("Codigo de invitacion copiado en portapapeles \nCodigo: " + texto);
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
