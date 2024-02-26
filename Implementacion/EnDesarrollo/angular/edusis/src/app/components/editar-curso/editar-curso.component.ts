import { Component, OnInit } from '@angular/core';
import { Curso } from '../../models/curso';
import { ActivatedRoute, Router } from '@angular/router';
import { DataApiService } from '../../services/data-api.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.css']
})
export class EditarCursoComponent implements OnInit {

  curso: Curso = { id: null, nombre: null, imagen: null, creadorId: null,codigo: null, comodines_activados: null };
  mensaje: string = null;
  tienecodigo = false;
  mostrarcodigo = false;
  id_profesor = null;
  files = null;
  imagen = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataApiService: DataApiService,
    private clipboard: Clipboard
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
          this.curso.comodines_activados = this.curso.comodines_activados;
            if(curso.codigo == null) {
              this.tienecodigo = false;
            } else {
              this.tienecodigo = true;
            }
        }
      );
    }
    else
    {
      //no existe codigo.
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
            respuesta.error.message,
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
    
  copiarTexto(texto: string) {
    this.clipboard.copy(texto);
    Swal.fire(
      "¡Código de invitación copiado!",
      "Código: " + texto,
      "success"
    )
  }
}
