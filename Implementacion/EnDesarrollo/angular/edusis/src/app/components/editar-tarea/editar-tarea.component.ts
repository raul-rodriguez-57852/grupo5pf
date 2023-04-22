import { Component, Injectable, OnInit } from "@angular/core";
import { Tarea } from "src/app/models/tarea";
import { DataApiService } from "src/app/services/data-api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DataTareaService } from "src/app/services/data-tarea.service";
import { NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from "@angular/forms";
import Swal from 'sweetalert2';

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
 @Injectable()
 export class CustomDateParserFormatter extends NgbDateParserFormatter {
 
   readonly DELIMITER = '/';
 
   parse(value: string): NgbDateStruct | null {
     if (value) {
       let date = value.split(this.DELIMITER);
       return {
         day : parseInt(date[0], 10),
         month : parseInt(date[1], 10),
         year : parseInt(date[2], 10)
       };
     }
     return null;
   }
 
   format(date: NgbDateStruct | null): string {
     return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
   }
 }


@Component({
  selector: "app-editar-tarea",
  templateUrl: "./editar-tarea.component.html",
  styleUrls: ["./editar-tarea.component.css"],
  providers: [
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})

export class EditarTareaComponent implements OnInit {
  tarea: Tarea = {
    id: null,
    nombre: null,
    creadorId: null,
    asignaturaId: null,
    puntajeMaximo: null,
    fechaLimite: null,
  };
  mensaje: string = null;
  cursoId: number = null;
  asignaturas = [];
  model: NgbDateStruct;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataApiService: DataApiService,
    private dataTareaService: DataTareaService,
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
        this.model = this.fromModel(tarea.fechaLimite);
        this.select(this.model);
        
      });
    }
    this.getAsignaturas();
  }

  getAsignaturas() {
    this.dataApiService.getAsignaturas(this.cursoId).then((respuesta) => {
      this.asignaturas = respuesta;
    });
  }

  save(formTarea: NgForm) {
    if (this.tarea.asignaturaId == null) {
      Swal.fire("Error al guardar.", "Recuerde seleccionar una asignatura", "error")
      return;
    }
    this.tarea.creadorId = this.dataApiService.getUsuario();
    this.dataTareaService
      .guardarTarea(this.tarea)
      .then((respuesta) => {
        this.tarea.id = respuesta;
        this.router.navigate(["editar-detalle-multimedia", { tareaId: this.tarea.id, cursoId: this.cursoId }]);
      })
      .catch((respuesta) => {
        Swal.fire(
          'Error al crear la tarea',
          "Ey, tranqui, seguro los chicos se alegraron :)",
          'error'
        );
      });
  }

  agregarDetalle() {
    this.router.navigate([
      "editar-detalle-multimedia",
      { tareaId: this.tarea.id }
    ]);
  }

  select(model){  
    this.tarea.fechaLimite = new Date(model.year,model.month-1,model.day);
  }

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split('-');
      return {
        day : parseInt(date[2], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[0], 10)
      };
    }
    return null;
  }
}
