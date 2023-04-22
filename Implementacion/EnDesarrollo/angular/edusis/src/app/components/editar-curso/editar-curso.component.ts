import { Component, OnInit } from '@angular/core';
import { Curso } from '../../models/curso';
import { ActivatedRoute, Router } from '@angular/router';
import { DataApiService } from '../../services/data-api.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.css']
})
export class EditarCursoComponent implements OnInit {

  curso: Curso = { id: null, nombre: null, imagen: null, creadorId: null,codigo: null };
  mensaje: string = null;
  tienecodigo = false;
  mostrarcodigo = false;
  id_profesor = null;
  files = null;
  imagen = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataApiService: DataApiService
  ) { }

  ngOnInit() {
    this.curso.id = this.route.snapshot.paramMap.get('id') != null ? Number(this.route.snapshot.paramMap.get('id')) : null;
    if (this.curso.id != null) {
      this.dataApiService.getCurso(this.curso.id.toString()).then(
        (curso) => 
        {
          this.mostrarcodigo = true;
          this.curso.nombre = curso.nombre;
          this.curso.imagen = curso.imagen;
          this.curso.codigo = curso.codigo;
            if(curso.codigo == null)
            {
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

  onFileChanged(event: any) {
    this.files = event.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(this.files[0]);
    reader.onload = (e) => {
      this.imagen = e.target.result;
      this.curso.imagen = this.imagen;
    }
  }

  async save(formCurso: NgForm) {
    this.id_profesor = this.dataApiService.getUsuario();
    if(this.id_profesor == null || this.dataApiService.getUserType() != 1){
      //Acceso denegado.
      this.router.navigate(['login']);
    }
    else{
      this.curso.creadorId = this.id_profesor;
      this.dataApiService.guardarCurso(this.curso).then(
        (respuesta) => {
          Swal.fire(
            'Hurra!',
            'Curso guardado con exito!',
            'success'
          );
          this.router.navigate(['cursos']);
        }
      ).catch(
        (respuesta) => {
          Swal.fire(
            'Ups!',
            'Se produjo un error al guardar el curso :(',
            'error'
          );
        }
      );
    }
    
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
              Swal.fire(
                'Hurra!',
                'Codigo generado con exito!',
                'success'
              );
            }
          ).catch(
            (respuesta) =>{
              Swal.fire(
                'Ups!',
                'Se produjo un error al guardar el curso :(',
                'error'
              );
            }
          )
        }
        
        this.dataApiService.getCurso(this.curso.id.toString()).then(
          (curso) => {
            this.curso.nombre = curso.nombre;
            this.curso.imagen = curso.imagen;
            this.curso.codigo = curso.codigo;
          }
          
        ).catch(
          (respuesta) => {
            Swal.fire(
              'Ups!',
              'Se produjo un error al buscar el curso :(',
              'error'
            );
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
