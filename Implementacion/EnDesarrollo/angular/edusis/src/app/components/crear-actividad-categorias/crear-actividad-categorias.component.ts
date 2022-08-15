import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { PlantillaCategorias } from 'src/app/models/plantilla-categorias';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-crear-actividad-categorias',
  templateUrl: './crear-actividad-categorias.component.html',
  styleUrls: ['./crear-actividad-categorias.component.css']
})
export class CrearActividadCategoriasComponent implements OnInit {

  paso = 1;
  segundos = 300;
  nombre = null;
  cantCategorias = 2;

  categorias: Categoria[] = [];
  plantilla: PlantillaCategorias;
  idTareaRoute = null;

  categoriaForm0: FormGroup;
  items0: FormArray;
  categoriaForm1: FormGroup;
  items1: FormArray;
  categoriaForm2: FormGroup;
  items2: FormArray;

  constructor(
    private dataApiService: DataApiService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.idTareaRoute =
      this.route.snapshot.paramMap.get('tareaId') != null
        ? Number(this.route.snapshot.paramMap.get('tareaId'))
        : null;

    this.plantilla = new PlantillaCategorias();
    let idProfesor = this.dataApiService.getUsuario();
    this.plantilla.creadorId = idProfesor;
    this.categorias = [];
    for (let index = 0; index < this.cantCategorias; index++) {
      const categoria = new Categoria();
      categoria.respuestas = [];
      this.categorias.push(categoria);
    }
    this.categoriaForm0 = this.formBuilder.group({
      nombre: this.categorias[0].nombre,
      items: this.formBuilder.array([this.createItem()])
    });
    this.categoriaForm1 = this.formBuilder.group({
      nombre: this.categorias[1].nombre,
      items: this.formBuilder.array([this.createItem()])
    });

  }

  next(formActividad: NgForm) {
    this.paso = 2;
    this.plantilla.nombre = this.nombre;
    this.plantilla.segundos = this.segundos;
    this.plantilla.categoriasDto = [];

    this.categoriaForm0 = this.formBuilder.group({
      nombre: this.categorias[0].nombre,
      items: this.formBuilder.array([this.createItem()])
    });
    this.categoriaForm1 = this.formBuilder.group({
      nombre: this.categorias[1].nombre,
      items: this.formBuilder.array([this.createItem()])
    });

    if (this.categorias.length == 3) {
      this.categoriaForm2 = this.formBuilder.group({
        nombre: this.categorias[2].nombre,
        items: this.formBuilder.array([this.createItem()])
      });
    }
  }

  changeCantidad(e) {
    console.log(e.target.value);
    this.categorias = [];
    for (let index = 0; index < this.cantCategorias; index++) {
      const categoria = new Categoria();
      categoria.respuestas = [];
      this.categorias.push(categoria);
    }

  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      respuesta: ''
    });
  }

  addItem(i): void {
    switch (i) {
      case 0: {
        this.items0 = this.categoriaForm0.get('items') as FormArray;
        this.items0.push(this.createItem());
        break;
      }
      case 1: {
        this.items1 = this.categoriaForm1.get('items') as FormArray;
        this.items1.push(this.createItem());
        break;
      }
      case 2: {
        this.items2 = this.categoriaForm2.get('items') as FormArray;
        this.items2.push(this.createItem());
        break;
      }
      default: {
        break;
      }
    }
  }

  eliminarItem(i, j): void {
    switch (i) {
      case 0: {
        this.items0 = this.categoriaForm0.get('items') as FormArray;
        this.items0.removeAt(j);
        break;
      }
      case 1: {
        this.items1 = this.categoriaForm1.get('items') as FormArray;
        this.items1.removeAt(j);;
        break;
      }
      case 2: {
        this.items2 = this.categoriaForm2.get('items') as FormArray;
        this.items2.removeAt(j);;
        break;
      }
      default: {
        break;
      }
    }
  }

  save() {
    this.items0.controls.forEach(element => {
      this.categorias[0].respuestas.push(element.value.respuesta);
    });
    this.items1.controls.forEach(element => {
      this.categorias[1].respuestas.push(element.value.respuesta);
    });
    if (this.categorias.length == 3) {
      this.items2.controls.forEach(element => {
        this.categorias[2].respuestas.push(element.value.respuesta);
      })
    };


    this.plantilla.categoriasDto = this.categorias;
    console.log(this.plantilla);
    this.dataApiService.crearActividadCategorias(this.plantilla).then(res => {
      console.log(res);
      /// Si no es nulo this.idTareaRoute significa que se llego a esta pantalla desde la creacion de una tarea. Redirigimos despues de guardar
      if (this.idTareaRoute != null) {
        this.router.navigate([
          "editar-detalle-actividad",
          { tareaId: this.idTareaRoute },
        ]);
      }
    });

  }

}
