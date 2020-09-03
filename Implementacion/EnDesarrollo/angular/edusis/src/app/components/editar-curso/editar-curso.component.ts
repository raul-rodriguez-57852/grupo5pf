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

  constructor(
    private route: ActivatedRoute,
    private dataApiService: DataApiService
  ) { }

  ngOnInit() {
    this.curso.id = this.route.snapshot.paramMap.get('id') != null ? Number(this.route.snapshot.paramMap.get('id')) : null;
    if (this.curso.id != null) {
      this.dataApiService.getCurso(this.curso.id.toString()).then(
        (emoji) => {
          this.curso.nombre = emoji.nombre;
          this.curso.iconoURL = emoji.iconoURL;
          this.curso.codigo = emoji.codigo;
        }
      );
    }
    if(this.curso.codigo == null){
      this.tienecodigo = false
      var x = document.getElementById('divCodigoGeneracion');
      //Aca deberia ocultarlo
    }
    else{
      this.tienecodigo = true;
      var x = document.getElementById('botondecodigo');
      (<HTMLButtonElement>x).value = "Copiar";
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
    

}
