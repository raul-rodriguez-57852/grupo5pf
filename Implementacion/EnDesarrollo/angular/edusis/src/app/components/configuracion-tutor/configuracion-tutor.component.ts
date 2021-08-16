import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';

@Component({
    selector: 'app-configuracion-tutor',
    templateUrl: './configuracion-tutor.component.html',
    styleUrls: ['./configuracion-tutor.component.css'],
  })

  export class ConfiguracionTutorComponent implements OnInit{
    alumno: Alumno = new Alumno();
    urlImagen = "assets\\img\\empty-classroom-stock-image.jpg";
    alumnos = [];
    mensaje: string;
    emojis = [];

    constructor(
    private router: Router,
    private dataApiService: DataApiService
    ){}
      
    ngOnInit(): void {
        this.getAlumnos();

    }

    async getAlumnos(){
        await this.dataApiService.alumnosByTutor(this.dataApiService.getUsuario()).then(
            (respuesta) => {
              this.alumnos = respuesta;
            }
          );
          
    }
    
    nadaPorAhora(){

    }
    editarAlumno(alumnoId: string){
        console.log("Estas queriendo editar el alumno con el id: ", alumnoId);
        //Seteo primero en En apiservice que el usuario va a ser el alumno.
        this.dataApiService.setUser(alumnoId, '2');
        this.router.navigate(['editar-alumno']);

    }

    eliminarAlumno(alumnoId: string){
        this.dataApiService.eliminarAlumno(alumnoId)
    }

    estadisticasAlumno(alumnoId: string){
        console.log("Estas queriendo ver las estadisticas del alumno con id: ", alumnoId);
    }
      
  }
  