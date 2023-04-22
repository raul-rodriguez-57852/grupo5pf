import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataApiService } from '../../services/data-api.service';
import { CeldaGrilla } from '../../models/celda-grilla';

@Component({
  selector: 'app-vista-previa-grilla',
  templateUrl: './vista-previa-grilla.component.html',
  styleUrls: ['./vista-previa-grilla.component.css']
})
export class VistaPreviaGrillaComponent implements OnInit {

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

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') != null ? Number(this.route.snapshot.paramMap.get('id')) : null;
    this.dataApiService.getActividad(this.id).then(res => {
      console.log(res);
      this.filas = Array.from({length: res.cantidadFilas}, (_, i) => i + 1);
      this.columnas = Array.from({length: res.cantidadColumnas}, (_, i) => i + 1);  
      this.celdas = res.celdas;
      this.nombre = res.nombre;
      this.dataApiService.getImagenGrilla(this.id).then(res => {
        this.imagen = res;
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

  volver() {
    this.router.navigate(['crear-actividad']);
  }

  finalizar() {
    this.final = true;
  }

}
