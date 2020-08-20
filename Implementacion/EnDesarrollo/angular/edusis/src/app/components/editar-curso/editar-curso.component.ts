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

  curso: Curso = { id: null, nombre: null, iconoURL: null, creadorId: null };
  mensaje: string = null;

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
        }
      );
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

}
