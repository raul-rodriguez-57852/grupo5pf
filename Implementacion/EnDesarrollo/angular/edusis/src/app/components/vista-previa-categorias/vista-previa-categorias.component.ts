import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-vista-previa-categorias',
  templateUrl: './vista-previa-categorias.component.html',
  styleUrls: ['./vista-previa-categorias.component.css']
})
export class VistaPreviaCategoriasComponent implements OnInit {

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

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') != null ? Number(this.route.snapshot.paramMap.get('id')) : null;
    this.mapAciertos = new Map<Categoria, number>();
    this.categorias = new Array();
    this.dataApiService.getActividad(this.id).then(res => {
      console.log(res);
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

  onItemDrop(e: any, categoria: Categoria) {

    console.log(e.dragData);
    console.log(categoria);
    if (categoria.respuestas.includes(e.dragData)) {
      this.mapAciertos.set(categoria, this.mapAciertos.get(categoria) + 1);
      this.cantAciertos++;
    }


    if (this.palabras.length > 0) {
      this.palabraActual = this.palabras.pop();
    } else {
      this.terminar();
    }

  }

  volver() {
    this.router.navigate(['crear-actividad']);
  }

}
