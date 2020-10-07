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
    linkYoutube: null,
  };
  mensaje: string = null;
  idTareaRoute = null;
  videoId: string = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataApiService: DataApiService,
    private dataTareaService: DataTareaService
  ) {}

  ngOnInit() {
    const tag = document.createElement("script");

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

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

  vistaPrevia() {
    if (this.detalle.linkYoutube === null) {
      this.mensaje = "Ingrese el link que desea visualizar.";
      document.getElementById("open-modal").click();
      return;
    }
    this.videoId = this.getVideoId(this.detalle.linkYoutube);
  }

  agregarActividades() {
    this.router.navigate([
      "editar-detalle-actividad",
      { tareaId: this.detalle.idTarea },
    ]);
  }

  getVideoId(link: string): string {
    var video_id = link.split("v=")[1];
    var ampersandPosition = video_id.indexOf("&");
    if (ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }
    return video_id;
  }
}
