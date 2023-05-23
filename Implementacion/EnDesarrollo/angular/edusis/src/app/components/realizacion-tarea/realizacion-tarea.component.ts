import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DetalleMultimedia } from "src/app/models/detalleMultimedia";
import { Realizacion } from 'src/app/models/realizacion';
import { RealizacionDetalle } from 'src/app/models/realizacion-detalle';
import { DataApiService } from "src/app/services/data-api.service";
import { DataTareaService } from "src/app/services/data-tarea.service";
import { RealizacionPasapalabraComponent } from "../realizacion-pasapalabra/realizacion-pasapalabra.component";
import { RealizacionPreguntasComponent } from "../realizacion-preguntas/realizacion-preguntas.component";
import { RealizacionGrillaComponent } from '../realizacion-grilla/realizacion-grilla.component';
import { RealizacionCategoriasComponent } from "../realizacion-categorias/realizacion-categorias.component";
import { RealizacionVfComponent } from "../realizacion-vf/realizacion-vf.component";

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
    imagen: null
  };
  mensaje: string = null;
  videoId: string = null;
  color: string = null;

  actividades = [];
  actividadActual = null;
  actividadId: number = null;
  actividadTipo: string = null;
  isMultimedia = true;
  isPreguntas = false;
  isPasapalabra = false;
  isGrilla = false;
  isCategorias = false;
  isVf = false;


  detalles: RealizacionDetalle[] = [];

  @ViewChild("realizacionPreguntas", { static: false })
  realizacionPreguntas: RealizacionPreguntasComponent;

  @ViewChild("realizacionPasapalabra", { static: false })
  realizacionPasapalabra: RealizacionPasapalabraComponent;

  @ViewChild("realizacionGrilla", { static: false })
  realizacionGrilla: RealizacionGrillaComponent;

  @ViewChild("realizacionCategorias", { static: false })
  realizacionCategorias: RealizacionCategoriasComponent;

  @ViewChild("realizacionVf", { static: false })
  realizacionVf: RealizacionVfComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataApiService: DataApiService,
    private dataTareaService: DataTareaService
  ) { }

  ngOnInit() {
    const colores = [
      '#B5D5C5', '#B08BBB', '#ECA869', '#F5F5DC', '#579BB1', '#82AAE3', '#91D8E4',
      '#FFF6BD', '#FF8E9E', '#ADA2FF', '#227C70', '#FAEAB1', '#FAAB78', '#FFCAC8']
    const random = Math.floor(Math.random() * colores.length);
    this.color = colores[random];
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
          this.dataTareaService
            .getImagenDetalle(this.detalleMultimedia.id.toString())
            .then((res) => {
              if (res !== null && res !== "") {
                this.detalleMultimedia.imagen = res;
              }
            });
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
          this.isPasapalabra = false;
          this.isGrilla = false;
          this.isCategorias = false;
          this.isVf = false;

          this.realizacionPreguntas.onInit(this.actividadId);
        }
        if (this.actividadTipo === "Pasapalabra") {
          this.isMultimedia = false;
          this.isPreguntas = false;
          this.isPasapalabra = true;
          this.isGrilla = false;
          this.isCategorias = false;
          this.isVf = false;

          this.realizacionPasapalabra.onInit(this.actividadId);
        }
        if (this.actividadTipo === "Grilla") {
          this.isMultimedia = false;
          this.isPreguntas = false;
          this.isPasapalabra = false;
          this.isGrilla = true;
          this.isCategorias = false;
          this.isVf = false;

          this.realizacionGrilla.onInit(this.actividadId);
        }
        if (this.actividadTipo === "Categorias") {
          this.isMultimedia = false;
          this.isPreguntas = false;
          this.isPasapalabra = false;
          this.isGrilla = false;
          this.isCategorias = true;
          this.isVf = false;

          this.realizacionCategorias.onInit(this.actividadId);
        }
        if (this.actividadTipo === "VerdaderoFalso") {
          this.isMultimedia = false;
          this.isPreguntas = false;
          this.isPasapalabra = false;
          this.isGrilla = false;
          this.isCategorias = false;
          this.isVf = true;

          this.realizacionVf.onInit(this.actividadId);
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
      this.isPasapalabra = false;
      this.isGrilla = false;
      this.isCategorias = false;
      this.isVf = false;
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
      this.volver();

    }
  }

  volver() {
    this.router.navigate(["curso-alumno", { id: this.cursoId }]);
  }
}
