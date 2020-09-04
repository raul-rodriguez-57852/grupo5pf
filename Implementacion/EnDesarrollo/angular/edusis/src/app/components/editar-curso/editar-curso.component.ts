import { Component, OnInit } from '@angular/core';
import { Curso } from '../../models/curso';
import { ActivatedRoute } from '@angular/router';
import { DataApiService } from '../../services/data-api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.css']
})
export class EditarCursoComponent implements OnInit {

  curso: Curso = { id: null, nombre: null, iconoURL: null, creadorId: null,codigo: null };
  mensaje: string = null;
  tienecodigo = false;
  mostrarcodigo = false;
  

  constructor(
    private route: ActivatedRoute,
    private dataApiService: DataApiService
  ) { }

  ngOnInit() {
    this.curso.id = this.route.snapshot.paramMap.get('id') != null ? Number(this.route.snapshot.paramMap.get('id')) : null;
    if (this.curso.id != null) {
      this.dataApiService.getCurso(this.curso.id.toString()).then(
        (emoji) => 
        {
          this.mostrarcodigo = true;
          this.curso.nombre = emoji.nombre;
          this.curso.iconoURL = emoji.iconoURL;
          this.curso.codigo = emoji.codigo;
            if(emoji.codigo == null)
            {
              console.log("El codigo no esta generado. Deberia poder generarlo.")
              this.tienecodigo = false;
            }
            else{
              this.tienecodigo = true;
            }
          
        }
      );
    }
    else
    {
      //no existe codigo.
      console.log('no existe ')
      this.mostrarcodigo = false;

    }

  }

  

  save(formCurso: NgForm) {
    this.curso.creadorId = this.dataApiService.usuario.id;
    this.dataApiService.guardarCurso(this.curso).then(
      (respuesta) => {
        this.mensaje = 'Curso guardado con éxito.';
        document.getElementById('open-modal').click();
//        this.recargar();
      }
    ).catch(
      (respuesta) => {
        this.mensaje = 'Error al guardar.';
        document.getElementById('open-modal').click();
      }
    );
  }

  recargar() {
    // window.location.reload();
  }
  generarCodigoCurso()
  {
      if(this.curso.codigo === null){
          console.log('Codigo Null');
          this.dataApiService.generarCodigoCurso(this.curso).then(
            (respuesta) => {
              this.mensaje = 'Codigo generado con éxito.';
              document.getElementById('open-modal').click();
              
            }
          );
        }
        
        this.dataApiService.getCurso(this.curso.id.toString()).then(
          (emoji) => {
            this.curso.nombre = emoji.nombre;
            this.curso.iconoURL = emoji.iconoURL;
            this.curso.codigo = emoji.codigo;
          }
          
        );
        (<HTMLInputElement>document.getElementById('contenedor-codigo')).value = this.curso.codigo;  
  }
    
  copiarTexto(estecurso: Curso){
      //the text that is to be copied to the clipboard
      var theText = estecurso.codigo.toString();

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
    alert("Codigo de invitacion copiado en portapapeles \nCodigo: " + estecurso.codigo.toString());
}

}
