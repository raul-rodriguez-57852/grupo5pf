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
  urlImagen = null;
  cursoId = null;
  asignaturas = [];
  asignaturaFiltro = null;
  tareas = [];
  mensaje: string;
  tareasPuntaje = null;
  tareasFiltradas = [];

  page = 1;
  pageSize = 4;
  collectionSize: number;

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
      this.urlImagen = res.iconoURL;
    });
    
  }

  getAll() {
    this.dataApiService.getAsignaturas(this.cursoId).then((asignaturas) => {
      this.asignaturas = asignaturas;
      console.log(this.asignaturas);
      this.dataTareaService.getTareas(this.cursoId).then((tareas) => {
        this.tareas = tareas;
        
        console.log(this.tareas);
        this.dataTareaService.getRealizaciones(this.cursoId, this.dataApiService.getUsuario()).then((realizaciones) => {
          realizaciones.forEach(element => {
            if(element.puntaje != null){
              element.puntaje = parseInt(element.puntaje);
            }
    
          });
          this.tareasPuntaje = realizaciones;
          this.tareasFiltradas = this.tareasPuntaje;
          this.collectionSize = this.tareasPuntaje.length;
          console.log(this.tareasPuntaje);
          this.imagenAAsignatura();
        });    
      });  
    });
  }

  // método provisorio luego cambiar
  imagenAAsignatura() {
    this.tareasPuntaje.forEach(tar => {
      this.asignaturas.forEach(asi => {
        if (tar.asignatura === asi.nombre) {
          tar.iconoURL = asi.iconoURL;
        }
      });
    });
  }

  irATarea(id: number) {
    this.router.navigate(["realizacion-tarea", { id: id, cursoId: this.cursoId }]);
  }


  volverACursos(){
    this.router.navigate(['home-alumno'], {state: {id: this.dataApiService.getUsuario()}});
  }

  onAsignaturaFilter(){
    if(this.asignaturaFiltro == null){
      this.tareasFiltradas = this.tareasPuntaje;
      this.collectionSize = this.tareasFiltradas.length;
      return;
    }

    let filtered = this.tareasPuntaje.filter(t => t.asignatura == this.asignaturaFiltro.nombre);
    console.log(filtered);
    this.tareasFiltradas = filtered;
    this.collectionSize = this.tareasFiltradas.length;


  }

}
