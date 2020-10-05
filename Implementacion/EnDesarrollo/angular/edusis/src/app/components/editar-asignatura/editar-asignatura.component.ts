import { Component, OnInit } from '@angular/core';
import { Asignatura } from '../../models/asignatura';
import { ActivatedRoute } from '@angular/router';
import { DataApiService } from '../../services/data-api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar-asignatura',
  templateUrl: './editar-asignatura.component.html',
  styleUrls: ['./editar-asignatura.component.css']
})
export class EditarAsignaturaComponent implements OnInit {

  asignatura: Asignatura = { id: null, nombre: null, iconoURL: null, creadorId: null, cursoId: null };
  mensaje: string = null;

  constructor(
    private route: ActivatedRoute,
    private dataApiService: DataApiService
  ) { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.asignatura.cursoId = this.route.snapshot.paramMap.get('cursoId') != null ? Number(this.route.snapshot.paramMap.get('cursoId')) : null;
    this.asignatura.id = this.route.snapshot.paramMap.get('id') != null ? Number(this.route.snapshot.paramMap.get('id')) : null;
    if (this.asignatura.id != null) {
      this.dataApiService.getAsignatura(this.asignatura.id.toString()).then(
        (emoji) => {
          this.asignatura.nombre = emoji.nombre;
          this.asignatura.iconoURL = emoji.iconoURL;
        }
      );
    }
  }

  save(formAsignatura: NgForm) {
    //this.asignatura.creadorId = this.dataApiService.usuario.id;
    this.asignatura.creadorId = 23;
    this.dataApiService.guardarAsignatura(this.asignatura).then(
      (respuesta) => {
        this.mensaje = 'Asignatura guardada con éxito.';
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
