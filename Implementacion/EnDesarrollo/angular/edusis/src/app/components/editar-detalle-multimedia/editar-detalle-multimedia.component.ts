import { Component, OnInit } from "@angular/core";
import { DetalleMultimedia } from "src/app/models/detalleMultimedia";
import { DataTareaService } from "src/app/services/data-tarea.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DataApiService } from "src/app/services/data-api.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-editar-detalle-multimedia",
  templateUrl: "./editar-detalle-multimedia.component.html",
  styleUrls: ["./editar-detalle-multimedia.component.css"],
})
export class EditarDetalleMultimediaComponent implements OnInit {
  detalle: DetalleMultimedia = {
    id: null,
    descripcion: null,
    idTarea: null,
  };
  mensaje: string = null;
  idTareaRoute = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataApiService: DataApiService,
    private dataTareaService: DataTareaService
  ) {}

  ngOnInit() {
    this.idTareaRoute =
      this.route.snapshot.paramMap.get("tareaId") != null
        ? Number(this.route.snapshot.paramMap.get("tareaId"))
        : null;
    this.get();
  }

  get() {
    this.dataTareaService
      .getDetalleMultimediaTarea(this.idTareaRoute)
      .then((res) => {
        if (res !== null) {
          this.detalle = res;
        }
      });
  }

  save(formDetalleMultimedia: NgForm) {
    this.detalle.idTarea = this.idTareaRoute;
    this.dataTareaService
      .guardarDetalleMultimedia(this.detalle)
      .then((respuesta) => {
        this.mensaje = "Detalle guardado con éxito.";
        document.getElementById("open-modal").click();
        //        this.recargar();
      })
      .catch((respuesta) => {
        this.mensaje = "Error al guardar.";
        document.getElementById("open-modal").click();
      });
  }

  agregarActividades() {
    this.router.navigate([
      "editar-detalle-actividad",
      { tareaId: this.detalle.idTarea },
    ]);
  }
}
