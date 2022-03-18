import { Component, OnInit } from '@angular/core';
import { PlantillaGrilla } from '../../models/plantilla-grilla';
import { CeldaGrilla } from '../../models/celda-grilla';
import { DataApiService } from '../../services/data-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-actividad-grilla',
  templateUrl: './crear-actividad-grilla.component.html',
  styleUrls: ['./crear-actividad-grilla.component.css']
})
export class CrearActividadGrillaComponent implements OnInit {

  paso = 1;
  nombre = null;
  imagen = null;
  cantidadFilas = null;
  cantidadColumnas = null;
  filas = [];
  columnas = [];
  width = 0;
  height = 0;
  files = null;

  celdas: CeldaGrilla[] = [];
  plantilla: PlantillaGrilla;
  idTareaRoute = null;

  constructor(
    private dataApiService: DataApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.idTareaRoute =
      this.route.snapshot.paramMap.get('tareaId') != null
        ? Number(this.route.snapshot.paramMap.get('tareaId'))
        : null;

    this.plantilla = new PlantillaGrilla();
    let idProfesor = this.dataApiService.getUsuario();  
    this.plantilla.creadorId = idProfesor;

  }

  next(formActividad: NgForm) {
    this.paso = 2;
    this.plantilla.nombre = this.nombre;
    this.plantilla.imagen = this.imagen;
    this.plantilla.celdasDto = [];
  }

  onFileChanged(event: any) {
    this.files = event.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(this.files[0]);
    reader.onload = (e) => {
      this.imagen = e.target.result;
    }
  }  

  async addCelda(fila, columna) {
    let inputValue = '';
    let showDenyButton = false;
    const celdaEncontrada = this.celdas.find(c => c.fila === fila && c.columna === columna);
    if (celdaEncontrada) {
      inputValue = celdaEncontrada.valorCorrecto;
      showDenyButton = true;
    }
    const { value: respuesta } = await Swal.fire({
      title: 'Ingrese la respuesta',
      input: 'text',
      inputValue: inputValue,
      showCancelButton: true,
      showDenyButton: showDenyButton,
      denyButtonText: 'Borrar',
      confirmButtonText: 'Guardar',
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return 'Debes agregar una respuesta.'
        }
      }
    })

    if (respuesta) {
      const celda = document.getElementById(fila + '-' + columna);
      celda.style.backgroundColor = 'green';
      // SI YA EXISTÍA MODIFICAMOS, SINO CREAMOS
      let celdaGrilla = celdaEncontrada;
      if (!celdaGrilla) {
        celdaGrilla = new CeldaGrilla();
        celdaGrilla.fila = fila;
        celdaGrilla.columna = columna;  
      }
      celdaGrilla.valorCorrecto = respuesta;
      if (!celdaEncontrada) {
        this.celdas.push(celdaGrilla);
      }
      console.log(this.celdas);
    }

    if (respuesta == false) {
      const celda = document.getElementById(fila + '-' + columna);
      celda.style.backgroundColor = 'transparent';
      this.celdas.indexOf(celdaEncontrada);
      this.celdas.splice(this.celdas.indexOf(celdaEncontrada), 1);
      console.log(this.celdas);
    }
  }

  calcularWidthHeight() {
    const img = document.getElementById('imagen-grilla');
    this.width = img.clientWidth;
    this.height = img.clientHeight;
  }

  actualizar() {
    this.plantilla.cantidadFilas = Number(this.cantidadFilas);
    this.plantilla.cantidadColumnas = Number(this.cantidadColumnas);
    this.filas = Array.from({length: this.plantilla.cantidadFilas}, (_, i) => i + 1);
    this.columnas = Array.from({length: this.plantilla.cantidadColumnas}, (_, i) => i + 1);
    this.celdas = [];
  }

  save() {
    this.plantilla.celdasDto = this.celdas;
    console.log(this.plantilla);
    this.dataApiService.crearActividadaGrilla(this.plantilla).then(res => {
      console.log(res);
      /// Si no es nulo this.idTareaRoute significa que se llego a esta pantalla desde la creacion de una tarea. Redirigimos despues de guardar
      if(this.idTareaRoute != null){
        this.router.navigate([
          "editar-detalle-actividad",
          { tareaId: this.idTareaRoute },
        ]);
      }
    });
  
  }

}
