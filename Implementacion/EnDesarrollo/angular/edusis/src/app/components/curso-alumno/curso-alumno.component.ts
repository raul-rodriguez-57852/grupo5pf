import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DataApiService } from "src/app/services/data-api.service";
import { DataTareaService } from "src/app/services/data-tarea.service";

@Component({
  selector: "app-curso-alumno",
  templateUrl: "./curso-alumno.component.html",
  styleUrls: ["./curso-alumno.component.css"],
})
export class CursoAlumnoComponent implements OnInit {
  nombre = null;
  cursoId = null;
  asignaturas = [];
  tareas = [];
  mensaje: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataApiService: DataApiService,
    private dataTareaService: DataTareaService
  ) {}

  ngOnInit() {
    this.cursoId =
      this.route.snapshot.paramMap.get("id") != null
        ? Number(this.route.snapshot.paramMap.get("id"))
        : null;
    this.get();
    this.getAll();
  }

  get() {
    this.dataApiService.getCurso(this.cursoId).then((res) => {
      this.nombre = res.nombre;
    });
  }

  getAll() {
    this.dataApiService.getAsignaturas(this.cursoId).then((asignaturas) => {
      this.asignaturas = asignaturas;
      console.log(this.asignaturas);
    });
    this.dataTareaService.getTareas(this.cursoId).then((tareas) => {
      this.tareas = tareas;
      console.log(this.tareas);
    });
  }

  irATarea(id: number) {
    this.router.navigate(["realizacion-tarea", { id }]);
  }
}
