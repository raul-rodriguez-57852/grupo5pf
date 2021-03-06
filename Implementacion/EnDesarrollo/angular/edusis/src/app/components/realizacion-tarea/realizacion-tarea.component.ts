import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DetalleMultimedia } from "src/app/models/detalleMultimedia";
import { Realizacion } from 'src/app/models/realizacion';
import { RealizacionDetalle } from 'src/app/models/realizacion-detalle';
import { DataApiService } from "src/app/services/data-api.service";
import { DataTareaService } from "src/app/services/data-tarea.service";
import { RealizacionPasapalabrasComponent } from "../realizacion-pasapalabras/realizacion-pasapalabras.component";
import { RealizacionPreguntasComponent } from "../realizacion-preguntas/realizacion-preguntas.component";

@Component({
  selector: "app-realizacion-tarea",
  templateUrl: "./realizacion-tarea.component.html",
  styleUrls: ["./realizacion-tarea.component.css"],
})
export class RealizacionTareaComponent implements OnInit {

  tarea = null;
  tareaId: number = null;
  cursoId: number = null;
  detalleMultimedia: DetalleMultimedia = {
    id: null,
    descripcion: null,
    idTarea: null,
    linkYoutube: null,
  };
  mensaje: string = null;
  videoId: string = null;

  actividades = [];
  actividadActual = null;
  actividadId: number = null;
  actividadTipo: string = null;
  isMultimedia = true;
  isPreguntas = false;
  isPasaPalabra = false;

  detalles: RealizacionDetalle[] = [];

  @ViewChild("realizacionPreguntas", { static: false })
  realizacionPreguntas: RealizacionPreguntasComponent;

  @ViewChild("realizacionPasapalabras", { static: false })
  realizacionPasapalabras: RealizacionPasapalabrasComponent;

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

    this.tareaId =
      this.route.snapshot.paramMap.get("id") != null
        ? Number(this.route.snapshot.paramMap.get("id"))
        : null;
    this.cursoId =
      this.route.snapshot.paramMap.get("cursoId") != null
        ? Number(this.route.snapshot.paramMap.get("cursoId"))
        : null;
  
    this.get();
  }

  get() {
    this.dataTareaService.getTarea(this.tareaId.toString()).then((res) => {
      this.tarea = res;
    });

    this.dataTareaService
      .getDetalleMultimediaTarea(this.tareaId)
      .then((res) => {
        if (res !== null) {
          this.detalleMultimedia = res;
          this.getYoutube();
        }
      });

    this.dataTareaService.getDetalleActividadTarea(this.tareaId).then((res) => {
      res.forEach((element) => {
        this.actividades.push(element.plantilla);
      });
    });
  }

  getYoutube() {
    if (this.detalleMultimedia.linkYoutube !== null) {
      this.videoId = this.getVideoId(this.detalleMultimedia.linkYoutube);
    }
  }

  getVideoId(link: string): string {
    var video_id = link.split("v=")[1];
    var ampersandPosition = video_id.indexOf("&");
    if (ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }
    return video_id;
  }

  continuarActividades() {
    if (this.actividades.length > 0) {
      this.actividades.reverse;
      this.actividadActual = this.actividades.pop();
      this.actividadId = this.actividadActual.id;
      this.goToActividad();
    }
  }

  goToActividad() {
    this.dataTareaService.getActividadTipo(this.actividadId).then((res) => {
      if (res !== null) {
        this.actividadTipo = res;
        if (this.actividadTipo === "Preguntas") {
          this.isMultimedia = false;
          this.isPreguntas = true;
          this.isPasaPalabra = false;

          this.realizacionPreguntas.onInit(this.actividadId);
        }
        if (this.actividadTipo === "Pasapalabras") {
          this.isMultimedia = false;
          this.isPreguntas = false;
          this.isPasaPalabra = true;

          this.realizacionPasapalabras.onInit(this.actividadId);
        }
      }
    });
  }

  onFinalizado(puntaje: number): void {
    let detalle = new RealizacionDetalle();
    detalle.idPlantilla = this.actividadId;
    detalle.puntajeObtenido = puntaje;
    this.detalles.push(detalle);
    if (this.actividades.length > 0) {
      this.actividadActual = this.actividades.pop();
      this.actividadId = this.actividadActual.id;
      this.goToActividad();
    } else {
      this.isMultimedia = true;
      this.isPreguntas = false;
      this.isPasaPalabra = false;

      /// Persistimos la realizacion

      let realizacion = new Realizacion();
      realizacion.idTarea = this.tareaId;
      ////  realizacion.idAlumno = Number.parseInt(this.dataApiService.getCookie("SessionCookie")); ////
      
      realizacion.idAlumno = this.dataApiService.getUsuario();
      realizacion.detalles = this.detalles;

      this.dataTareaService
      .guardarRealizacionTarea(realizacion)
      .then((respuesta) => {
        this.mensaje = "¡La tarea ha sido completada!";
      })
      .catch((respuesta) => {
        this.mensaje = "Error al guardar.";
        document.getElementById("open-modal").click();
      });

    }
  }

  volver() {
    this.router.navigate(["curso-alumno", { id: this.cursoId }]);
  }
}
