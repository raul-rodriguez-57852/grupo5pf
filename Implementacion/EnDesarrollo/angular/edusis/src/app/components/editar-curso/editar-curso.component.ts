import { Component, OnInit } from '@angular/core';
import { Curso } from '../../models/curso';
import { ActivatedRoute, Router } from '@angular/router';
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
  id_profesor = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

  

  async save(formCurso: NgForm) {
    //Busco en cookies, para ver si estsa el usuario loggeado, si esta, agarro sus datos, 
    //Si no esta, lo mando a loggearse.
    var session_id = this.dataApiService.getCookie("SessionCookie");
    //ya tengo el id de la session, vamos a ver si es valido!
    
    await this.dataApiService.validarSession(session_id).then(
      (respuesta) => {
        this.id_profesor = respuesta;
      }
      );
      if(this.id_profesor == null)
      {
        this.router.navigate(['login']);
      }
    this.curso.creadorId = this.id_profesor;
    console.log("CREADOR ID: ",this.curso.creadorId);
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
    this.router.navigate(['cursos']);
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
          ).catch(
            (respuesta) =>{
              this.mensaje = "Error al generar el codigo!";
              document.getElementById('open-modal').click();
            }
          )
        }
        
        this.dataApiService.getCurso(this.curso.id.toString()).then(
          (emoji) => {
            this.curso.nombre = emoji.nombre;
            this.curso.iconoURL = emoji.iconoURL;
            this.curso.codigo = emoji.codigo;
          }
          
        ).catch(
          (respuesta) => {
            this.mensaje = "Error al buscar el curso!";
            document.getElementById('open-modal').click();
          }
        );
        (<HTMLInputElement>document.getElementById('contenedor-codigo')).value = this.curso.codigo;  
  }
    
  copiarTexto(estecurso: Curso){
      //El texto que va a ser copiado al portapapeles
      var theText = estecurso.codigo.toString();

      //creo un div vacio
      var hiddenCopy = document.createElement('div');
      //seteo el innerHTML del div
      hiddenCopy.innerHTML = theText;
      //seteo la position para que sea absolute & afuera de la pantalla
      hiddenCopy.style.position = 'absolute';
      hiddenCopy.style.left = '-9999px';

      //checko si el usuario tiene algun rango ya previo de seleccion
      var currentRange;
      if(document.getSelection().rangeCount > 0)
      {
          //lo tiene, entonces lo guardo
          currentRange = document.getSelection().getRangeAt(0);
          //elimino la seleccion que tiene 
          window.getSelection().removeRange(currentRange);
      }
      else
      {
          //No habia nada seleccionado
         currentRange = false;
      }

    //agrego el div al body
    document.body.appendChild(hiddenCopy);
    //creo un nuevo rango de seleccion
    var CopyRange = document.createRange();
    //seteo el rango al div
    CopyRange.selectNode(hiddenCopy);
    //agrego el copyRange
    window.getSelection().addRange(CopyRange);

    //uso try porque no todos lo navegadores lo soportan
    try
    {
          //copio el texto
          document.execCommand('copy');
    }
    catch(err)
    {
        window.alert("Your Browser Doesn't support this! Error : " + err);
    }
    //elimino el rango de seleccion
    window.getSelection().removeRange(CopyRange);
    //elimino el  hidden div
    document.body.removeChild(hiddenCopy);
    //devuelvo el rango de seleccion viejo
    if(currentRange)
    {
          window.getSelection().addRange(currentRange);
    }
    alert("Codigo de invitacion copiado en portapapeles \nCodigo: " + estecurso.codigo.toString());
}

}
