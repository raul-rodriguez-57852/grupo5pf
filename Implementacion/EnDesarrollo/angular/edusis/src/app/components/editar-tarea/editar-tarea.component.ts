import { Component, Injectable, OnInit } from "@angular/core";
import { Tarea } from "src/app/models/tarea";
import { DataApiService } from "src/app/services/data-api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DataTareaService } from "src/app/services/data-tarea.service";
import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from "@angular/forms";


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
    //this.tarea.creadorId = this.dataApiService.usuario.id;
    if (this.tarea.asignaturaId == null) {
      this.mensaje = "Error al guardar. Debe seleccionar una asignatura.";
      document.getElementById("open-modal").click();
      return;
    }
    /////////////////////////////////////// ACA OBTENER ID DEL USUARIO LOGUEADO  //////////////////////////////////////
    this.tarea.creadorId = this.dataApiService.getUsuario();
    /////////////////////////////////////// ACA OBTENER ID DEL USUARIO LOGUEADO  //////////////////////////////////////
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

  select(model){  
    console.log(model);
    this.tarea.fechaLimite = new Date(model.year,model.month-1,model.day);
    console.log(this.tarea.fechaLimite);

  }

}
