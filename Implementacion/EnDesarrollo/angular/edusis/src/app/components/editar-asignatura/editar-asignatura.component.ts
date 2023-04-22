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

  asignatura: Asignatura = { id: null, nombre: null, imagen: null, creadorId: null, cursoId: null };
  files = null;
  imagen = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataApiService: DataApiService,
  ) { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.asignatura.cursoId = this.route.snapshot.paramMap.get('cursoId') != null ? Number(this.route.snapshot.paramMap.get('cursoId')) : null;
    this.asignatura.id = this.route.snapshot.paramMap.get('id') != null ? Number(this.route.snapshot.paramMap.get('id')) : null;
    if (this.asignatura.id != null) {
      this.dataApiService.getAsignatura(this.asignatura.id.toString()).then(
        (asignatura) => {
          this.asignatura.nombre = asignatura.nombre;
          this.asignatura.imagen = asignatura.imagen;
          this.asignatura.cursoId = asignatura.cursoId;
          this.asignatura.creadorId = asignatura.creadorId;
        }
      );
    }
  }

  onFileChanged(event: any) {
    this.files = event.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(this.files[0]);
    reader.onload = (e) => {
      this.imagen = e.target.result;
      this.asignatura.imagen = this.imagen;
    }
  }

  async save(formAsignatura: NgForm) {
    this.asignatura.creadorId = this.dataApiService.getUsuario();
    await this.dataApiService.guardarAsignatura(this.asignatura).then(
      (respuesta) => {
        Swal.fire(
          'Hurra!',
          '¡Asignatura guardada con éxito!',
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
