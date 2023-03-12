import { Component, Output, EventEmitter } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-realizacion-grilla',
  templateUrl: './realizacion-grilla.component.html',
  styleUrls: ['./realizacion-grilla.component.css']
})
export class RealizacionGrillaComponent {
  @Output() finalizado: EventEmitter<number> = new EventEmitter<number>();

  id = null;
  imagen = null;
  columnas = null;
  filas = null;
  celdas = null;
  nombre = null;
  width = 0;
  height = 0;
  final = false;
  respuestasCorrectas = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataApiService: DataApiService
  ) { }

  onInit(id: number) {
    /* this.id = this.route.snapshot.paramMap.get('id') != null ? Number(this.route.snapshot.paramMap.get('id')) : null; */

    this.id = id;
    this.dataApiService.getActividad(this.id).then(res => {
      console.log(res);
      this.filas = Array.from({ length: res.cantidadFilas }, (_, i) => i + 1);
      this.columnas = Array.from({ length: res.cantidadColumnas }, (_, i) => i + 1);
      this.celdas = res.celdas;
      this.nombre = res.nombre;
      this.dataApiService.getImagenGrilla(this.id).then(res => {
        this.imagen = res;
        console.log(this.imagen);
      });
    });
  }

  calcularWidthHeight() {
    const img = document.getElementById('imagen-grilla');
    this.width = img.clientWidth;
    this.height = img.clientHeight;
  }

  pintarCelda(fila, columna) {
    let pintar = false;
    this.celdas.forEach(element => {
      if (element.fila === fila && element.columna === columna) {
        pintar = true;
      }
    });
    return pintar;
  }

  async responder(fila, columna) {
    let inputValue = '';
    const { value: respuesta } = await Swal.fire({
      title: 'Ingrese la respuesta',
      input: 'text',
      inputValue: inputValue,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return 'Debes agregar una respuesta.'
        }
      }
    })

    if (respuesta) {
      const boton = document.getElementById('boton-' + fila + '-' + columna);
      let correcto = false;
      this.celdas.forEach(element => {
        if (element.fila === fila && element.columna === columna) {
          if (respuesta == element.valorCorrecto) {
            correcto = true;
          }
        }
      });
      if (correcto) {
        boton.style.backgroundColor = 'green';
        this.respuestasCorrectas = this.respuestasCorrectas + 1;
      } else {
        boton.style.backgroundColor = 'red';
      }
      (boton as HTMLButtonElement).disabled = true;
    }

  }

  terminar() {
    this.final = true;
  }

  volver() {
    this.router.navigate(['crear-actividad']);
  }

  finalizar() {
    this.final = true;
    this.finalizado.emit(this.respuestasCorrectas);
  }

}
