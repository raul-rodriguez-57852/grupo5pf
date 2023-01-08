import { Component, OnInit } from "@angular/core";
import { DetalleMultimedia } from "src/app/models/detalleMultimedia";
import { DataTareaService } from "src/app/services/data-tarea.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DataApiService } from "src/app/services/data-api.service";
import { NgForm, NG_VALUE_ACCESSOR } from "@angular/forms";
import Swal from 'sweetalert2';

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
    imagen: null
  };

  idTareaRoute = null;
  videoId: string = null;
  files = null;
  cursoId = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataApiService: DataApiService,
    private dataTareaService: DataTareaService
  ) { }

  ngOnInit() {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    this.idTareaRoute =
      this.route.snapshot.paramMap.get("tareaId") != null
        ? Number(this.route.snapshot.paramMap.get("tareaId"))
        : null;
    
    this.cursoId =
      this.route.snapshot.paramMap.get("cursoId") != null
        ? Number(this.route.snapshot.paramMap.get("cursoId"))
        : null;
    this.get();
  }

  get() {
    console.log("idTareaRoute: " + this.idTareaRoute)
    this.dataTareaService
      .getDetalleMultimediaTarea(this.idTareaRoute)
      .then((res) => {
        if (res !== null) {
          this.detalle = res;
          console.log(res)
          this.cursoId = res["tarea"]["asignatura"]["curso"].id;
          this.dataTareaService
            .getImagenDetalle(this.detalle.id.toString())
            .then((res) => {
              if (res !== null) {
                this.detalle.imagen = res;
              }
            });
        }
      });
  }

  save(formDetalleMultimedia: NgForm) {
    this.detalle.idTarea = this.idTareaRoute;
    this.dataTareaService
      .guardarDetalleMultimedia(this.detalle)
      .then((respuesta) => {
        Swal.fire({
          title: "Exitos!",
          text: "Detalle tarea fue guardado con exito!",
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonText: 'Volver al curso',
          confirmButtonText: 'Agregar Actividades!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.agregarActividades()
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            this.router.navigate(["curso", { id: this.cursoId}]);
          }
        })
      })
      .catch((respuesta) => {
        Swal.fire(
          'Error al crear la tarea',
          "Ey, tranqui, seguro los chicos se alegraron :)",
          'error'
        );
      });
  }

  vistaPrevia() {
    if (this.detalle.linkYoutube === null || this.detalle.linkYoutube == '') {
      Swal.fire("Error", "Ingrese el link que desea visualizar.", "error")
      return;
    }
    this.videoId = this.getVideoId(this.detalle.linkYoutube);
  }

  agregarActividades() {
    this.router.navigate([
      "editar-detalle-actividad",
      { tareaId: this.detalle.idTarea,
        cursoId: this.cursoId
      },
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

  onFileChanged(event: any) {
    this.files = event.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(this.files[0]);
    reader.onload = (e) => {
      this.detalle.imagen = e.target.result.toString();
    }
  }

}


