import { Component, OnInit } from '@angular/core';
import { Asignatura } from '../../models/asignatura';
import { ActivatedRoute, Router } from '@angular/router';
import { DataApiService } from '../../services/data-api.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-asignatura',
  templateUrl: './editar-asignatura.component.html',
  styleUrls: ['./editar-asignatura.component.css']
})

export class EditarAsignaturaComponent implements OnInit {

  asignatura: Asignatura = { id: null, nombre: null, iconoURL: null, creadorId: null, cursoId: null };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataApiService: DataApiService
  ) { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.asignatura.cursoId = this.route.snapshot.paramMap.get('cursoId') != null ? Number(this.route.snapshot.paramMap.get('cursoId')) : null;
    this.asignatura.id = this.route.snapshot.paramMap.get('id') != null ? Number(this.route.snapshot.paramMap.get('id')) : null;
    if (this.asignatura.id != null) {
      this.dataApiService.getAsignatura(this.asignatura.id.toString()).then(
        (asignatura) => {
          this.asignatura.nombre = asignatura.nombre;
          this.asignatura.iconoURL = asignatura.iconoURL;
          this.asignatura.cursoId = asignatura.curso.id;
          this.asignatura.creadorId = asignatura.creador.id;
        }
      );
    }
  }

  save(formAsignatura: NgForm) {
    this.asignatura.creadorId = this.dataApiService.getUsuario();
    this.dataApiService.guardarAsignatura(this.asignatura).then(
      (respuesta) => {
        Swal.fire(
          'Hurra!',
          'Asignatuda guardada con exito!',
          'success'
        );
      }
    ).catch(
      (respuesta) => {
        Swal.fire(
          'Upss',
          'Error al guardar la asignatura :(',
          'error'
      );
      }
    );
    this.recargar();
  }

  recargar() {
    this.router.navigate(['curso', { id: this.asignatura.cursoId }]);
  }

}
