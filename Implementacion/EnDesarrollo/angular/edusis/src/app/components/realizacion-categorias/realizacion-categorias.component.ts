import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, ViewChildren, EventEmitter, OnInit, Output, QueryList, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { DataApiService } from 'src/app/services/data-api.service';
import { ConfettiLauncher } from 'src/app/services/confettiLauncher';

@Component({
  selector: 'app-realizacion-categorias',
  templateUrl: './realizacion-categorias.component.html',
  styleUrls: ['./realizacion-categorias.component.css']
})
export class RealizacionCategoriasComponent {

  @ViewChildren('divElement') divElements: QueryList<ElementRef>;

  @Output() finalizado: EventEmitter<number> = new EventEmitter<number>();

  id = null;
  segundos = null;
  timeLeft: number = null;
  interval;
  categorias: Categoria[];
  palabras = [];
  palabraActual = null;
  final = false;
  cantCategorias = null;
  mapAciertos: Map<Categoria, number>;
  cantPreguntas = 0;
  cantAciertos = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataApiService: DataApiService
  ) { }

  onInit(id: number) {
    this.id = id;
    this.final = false;
    this.mapAciertos = new Map<Categoria, number>();
    this.categorias = new Array();
    this.dataApiService.getActividad(this.id).then(res => {
      this.segundos = res.segundos;
      this.timeLeft = this.segundos;
      res.categorias.forEach(categoria => {
        let cate = new Categoria();
        cate.nombre = categoria.nombre;
        cate.respuestas = [];
        let respuestas = categoria.respuestas;
        respuestas.forEach(respuesta => {
          cate.respuestas.push(respuesta.respuesta);
          this.palabras.push(respuesta.respuesta);
          this.cantPreguntas++;

        });
        this.categorias.push(cate);
        this.mapAciertos.set(cate, 0);
        this.cantCategorias = this.categorias.length;

      });
      this.palabras = this.mezclar(this.palabras);
      this.palabraActual = this.palabras.pop();
      this.startTimer();
    });
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.terminar();
      }
    }, 1000);
  }

  terminar() {
    this.final = true;
  }

  mezclar(array) {
    // tslint:disable-next-line: one-variable-per-declaration
    let currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  onDragEnded(event: CdkDragEnd, palabraActual: string): void {
    event.source._dragRef.reset();
    this.divElements.forEach(element => {
      const div = element.nativeElement.getBoundingClientRect();
      const xFinal = div.x + div.width;
      const yFinal = div.y + div.height;
      if (div.x < event.dropPoint.x &&
        event.dropPoint.x < xFinal &&
        div.y < event.dropPoint.y &&
        event.dropPoint.y < yFinal) {
          const nombreCategoria = element.nativeElement.id;
          console.log('Tiró', palabraActual, 'en', nombreCategoria);
          const categoria = this.categorias.find(cat => cat.nombre === nombreCategoria);
          console.log(categoria);
          if (categoria.respuestas.includes(palabraActual)) {
            this.mapAciertos.set(categoria, this.mapAciertos.get(categoria) + 1);
            let confettiShoulBeLaunchedAt = event.dropPoint.x / window.innerWidth;
            const launcher = new ConfettiLauncher();
            launcher.dispararConfetti(0.90, confettiShoulBeLaunchedAt);
            this.cantAciertos++;
          }
          console.log(this.palabras);
          if (this.palabras.length > 0) {
            console.log(this.palabraActual)
            this.palabraActual = this.palabras.pop();
            console.log('La nueva palabra es: ', this.palabraActual)
          } else {
            this.terminar();
          }
        }
    });
  }    

  finalizar() {
    this.final = true;
    this.finalizado.emit(this.cantAciertos);
  }

}
