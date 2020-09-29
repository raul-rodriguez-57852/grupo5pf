import { Component, OnInit } from "@angular/core";
import { Tarea } from "src/app/models/tarea";
import { DataApiService } from "src/app/services/data-api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DataTareaService } from "src/app/services/data-tarea.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-editar-tarea",
  templateUrl: "./editar-tarea.component.html",
  styleUrls: ["./editar-tarea.component.css"],
})
export class EditarTareaComponent implements OnInit {
  tarea: Tarea = {
    id: null,
    nombre: null,
    creadorId: null,
    asignaturaId: null,
    puntajeMaximo: null,
  };
  mensaje: string = null;
  cursoId: number = null;
  asignaturas = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataApiService: DataApiService,
    private dataTareaService: DataTareaService
  ) {}

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.cursoId =
      this.route.snapshot.paramMap.get("cursoId") != null
        ? Number(this.route.snapshot.paramMap.get("cursoId"))
        : null;
    this.tarea.id =
      this.route.snapshot.paramMap.get("id") != null
        ? Number(this.route.snapshot.paramMap.get("id"))
        : null;
    if (this.tarea.id != null) {
      this.dataTareaService.getTarea(this.tarea.id.toString()).then((tarea) => {
        this.tarea.nombre = tarea.nombre;
        this.tarea.creadorId = tarea.creador.id;
        this.tarea.asignaturaId = tarea.asignatura.id;
        this.tarea.puntajeMaximo = tarea.puntajeMaximo;
      });
    }
    this.getAsignaturas();
  }

  getAsignaturas() {
    this.dataApiService.getAsignaturas(this.cursoId).then((respuesta) => {
      this.asignaturas = respuesta;
      console.log(this.asignaturas);
    });
  }

  save(formTarea: NgForm) {
    this.tarea.creadorId = this.dataApiService.usuario.id;
    this.dataTareaService
      .guardarTarea(this.tarea)
      .then((respuesta) => {
        this.tarea.id = respuesta;
        this.mensaje = "Tarea guardada con éxito.";
        document.getElementById("open-modal").click();
        //        this.recargar();
      })
      .catch((respuesta) => {
        this.mensaje = "Error al guardar.";
        document.getElementById("open-modal").click();
      });
  }

  agregarDetalle() {
    this.router.navigate([
      "editar-detalle-multimedia",
      { tareaId: this.tarea.id },
    ]);
  }
}
