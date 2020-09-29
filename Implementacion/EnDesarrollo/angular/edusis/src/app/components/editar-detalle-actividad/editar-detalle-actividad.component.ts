import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DetalleActividad } from "src/app/models/detalleActividad";
import { DataApiService } from "src/app/services/data-api.service";
import { DataTareaService } from "src/app/services/data-tarea.service";

@Component({
  selector: "app-editar-detalle-actividad",
  templateUrl: "./editar-detalle-actividad.component.html",
  styleUrls: ["./editar-detalle-actividad.component.css"],
})
export class EditarDetalleActividadComponent implements OnInit {
  idTareaRoute = null;
  actividadesSelected = [];
  actividades = [];
  selectedActividad = null;
  mensaje: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataApiService: DataApiService,
    private dataTareaService: DataTareaService
  ) {}

  ngOnInit(): void {
    this.idTareaRoute =
      this.route.snapshot.paramMap.get("tareaId") != null
        ? Number(this.route.snapshot.paramMap.get("tareaId"))
        : null;
    this.getAll();
    this.checkRepetidos();
  }

  getAll() {
    this.dataTareaService
      .getDetalleActividadTarea(this.idTareaRoute)
      .then((res) => {
        res.forEach((element) => {
          this.actividadesSelected.push(element.plantilla);
        });
      });
    this.dataApiService.getActividades().then((res) => {
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
    this.router.navigate(["vista-previa-actividad", { id }]);
  }

  eliminar(actividad: DetalleActividad) {
    for (let index = 0; index < this.actividadesSelected.length; index++) {
      if (this.actividadesSelected[index] === actividad) {
        this.actividadesSelected.splice(index, 1);
      }
    }
  }

  onChangeObj(newObj) {
    console.log(newObj);
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

    this.dataTareaService
      .guardarDetallesActividad(detalles)
      .then((respuesta) => {
        this.mensaje = "Detalles guardados con éxito.";
        document.getElementById("open-modal").click();
        //        this.recargar();
      })
      .catch((respuesta) => {
        this.mensaje = "Error al guardar.";
        document.getElementById("open-modal").click();
      });
  }

  nuevaActividad() {}
}
