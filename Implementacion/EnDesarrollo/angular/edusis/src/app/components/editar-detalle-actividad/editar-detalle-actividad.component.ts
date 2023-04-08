import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleActividad } from 'src/app/models/detalleActividad';
import { DataApiService } from 'src/app/services/data-api.service';
import { DataTareaService } from 'src/app/services/data-tarea.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-detalle-actividad',
  templateUrl: './editar-detalle-actividad.component.html',
  styleUrls: ['./editar-detalle-actividad.component.css'],
})
export class EditarDetalleActividadComponent implements OnInit {
  idTareaRoute = null;
  actividadesSelected = [];
  actividades = [];
  selectedActividad = null;
  cursoId = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataApiService: DataApiService,
    private dataTareaService: DataTareaService
  ) { }

  ngOnInit(): void {
    this.idTareaRoute =
      this.route.snapshot.paramMap.get('tareaId') != null
        ? Number(this.route.snapshot.paramMap.get('tareaId'))
        : null;
    this.getAll();
    this.checkRepetidos();
    this.cursoId =
      this.route.snapshot.paramMap.get('cursoId') != null
        ? Number(this.route.snapshot.paramMap.get('cursoId'))
        : null;
  }

  getAll() {
    this.dataTareaService
      .getDetalleActividadTarea(this.idTareaRoute)
      .then((res) => {
        res.forEach((element) => {
          this.actividadesSelected.push(element.plantilla);
        });
      });

    let idProfesor = this.dataApiService.getUsuario();
    this.dataApiService.getActividadesByProfesor(idProfesor).then((res) => {
      this.actividades = res;
    });
  }

  checkRepetidos() {
    for (const iterator of this.actividadesSelected) {
      for (let indexj = 0; indexj < this.actividades.length; indexj++) {
        if (iterator === this.actividades[indexj]) {
          this.actividades.splice(indexj, 1);
        }
      }
    }
  }

  vistaPrevia(id: number) {
    this.router.navigate(['vista-previa-actividad', { id }]);
  }

  eliminar(actividad: DetalleActividad) {
    for (let index = 0; index < this.actividadesSelected.length; index++) {
      if (this.actividadesSelected[index] === actividad) {
        this.actividadesSelected.splice(index, 1);
      }
    }
  }

  onChangeObj(newObj) {
    this.selectedActividad = newObj;
    this.actividadesSelected.push(this.selectedActividad);
    for (let index = 0; index < this.actividades.length; index++) {
      if (this.actividades[index] === this.selectedActividad) {
        this.actividades.splice(index, 1);
      }
    }
  }

  guardarDetalles() {
    const detalles: DetalleActividad[] = [];
    this.actividadesSelected.forEach((element) => {
      const detalle = new DetalleActividad();
      detalle.idPlantilla = element.id;
      detalle.idTarea = this.idTareaRoute;
      detalles.push(detalle);
    });

    if (detalles.length == 0) {
      Swal.fire("Opps", "Debes registrar una actividad antes de guardar!", "warning")
      return;
    }

    this.dataTareaService
      .guardarDetallesActividad(detalles)
      .then((respuesta) => {
        Swal.fire("Exitos!", "Actividad guardada con exito!", "success")
        this.router.navigate(["curso", { id: this.cursoId }]);
      })
      .catch((respuesta) => {
        Swal.fire("Error!", "Se produjo un error al guardar la actividad", "error")
      });
  }

  nuevaActividad() {
    this.router.navigate([
      "crear-actividad",
      { tareaId: this.idTareaRoute, cursoId: this.cursoId },
    ]);
  }
}
