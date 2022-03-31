import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import Swal from 'sweetalert2';

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
    alumnoLastConnection = null;
    password: string;

    constructor(
    private router: Router,
    private dataApiService: DataApiService
    ){}
      
    ngOnInit(): void {
      this.requestPasswordPopUp()
      this.getAlumnos();
    }

    async getAlumnos() {
      var idTutor = this.dataApiService.getUsuario();
      if (this.dataApiService.getUserType() == this.dataApiService.getAlumnoType()) {
        //ALumno tratando de entrar.
        await this.dataApiService.tutorByAlumno(this.dataApiService.getUsuario()).then(
          (respuesta) => {
            idTutor = respuesta.id;
          }
        );
      }
      await this.dataApiService.alumnosByTutor(idTutor).then (
            (respuesta) => {
              this.alumnos = respuesta;
            }
          );
    }

    async requestPasswordPopUp() { 
      const { value: password } = await Swal.fire({
        showCancelButton: true,
        cancelButtonColor: '#d33',
        title: 'Guau! digo, Quien eres?',
        imageUrl: '\\assets\\img\\dogGuard.png',
        imageWidth: 300,
        imageHeight: 385,
        input: 'password',
        inputLabel: 'Contraseña',
        inputPlaceholder: 'Ingrese su contraseña',
        inputAttributes: {
          maxlength: '10',
          autocapitalize: 'off',
          autocorrect: 'off'
        }
      });
      if (password == null) {
        this.router.navigate(['perfiles']);
        return;
      } 
      
      if (password) {
        var result =  await this.validarTutor(password);
        if(result) {
            Swal.fire('Bienvenido :)','','success');
            return;
        } else {
            await Swal.fire({
              title: 'Grrr! No te conozco ;(',
              imageUrl: '\\assets\\img\\dogGuardAngry.png',
              imageWidth: 300,
              imageHeight: 385
            });
            this.requestPasswordPopUp();
        }
      } else {
        await Swal.fire('Ingresa tu contraseña','','warning');
        this.requestPasswordPopUp();
      }
    }
    
    //TODO -> SEND THIS FUNCTION TO APISERVICE SO IT CAN BE REUSED
    dateFormatting(fecha: string) {
        var delta = Math.round((+new Date() -  +new Date(fecha)) / 1000);
        var minute = 60,
        hour = minute * 60,
        day = hour * 24,
        week = day * 7;
        var diasSemana = {
          'Mon': "lunes",
          'Tue': "martes",
          'Wed': "miercoles",
          "Thu": "jueves",
          'Fri': "viernes",
          'Sat': "sabado",
          'Sun': "domingo",
       };
       var meses = {
        'Jan': "enero",
        'Feb': "febrero",
        'Mar': "marzo",
        "Apr": "abril",
        'May': "mayo",
        'Jun': "junio",
        'Jul': "julio",
        'Aug': "agosto",
        'Sep': "septiembre",
        'Oct': "octubre",
        'Nov': "noviembre",
        'Dec': "diciembre",
     };
       let userDate = new Date(fecha).toString();
       //ADAPT IT TO OUR LOCAL TIME ZONE
       delta = delta - 3 * hour;
       if (fecha == null) {
        return this.alumnoLastConnection = 'Nunca ha ingresado a la plataforma.';
       }

      if (delta < 30) {
        this.alumnoLastConnection = 'recien';
      } else if (delta < minute) {
        this.alumnoLastConnection = 'hace ' + delta + ' segundos.';
      } else if (delta < 2 * minute) {
        this.alumnoLastConnection = 'hace un minuto.'
      } else if (delta < hour) {
        this.alumnoLastConnection = Math.floor(delta / minute) + ' minutos atras.';
      } else if (Math.floor(delta / hour) == 1) {
        this.alumnoLastConnection = 'hace una hora.'
      } else if (delta < day) {
        this.alumnoLastConnection = Math.floor(delta / hour) + ' horas atras.';
      } else if (delta < day * 2) {
        this.alumnoLastConnection = 'ayer';
      }else if (delta < week + day) {
        this.alumnoLastConnection = 'El ' + diasSemana[userDate.substr(0, 3)] + ' pasado.';
      }
      else{
        this.alumnoLastConnection = 'El ' + diasSemana[userDate.substr(0, 3)] + ' ' + userDate.substr(8,2) + ' de  ' + meses[userDate.substr(4, 3)] + ' del '+ userDate.substr(11, 4);
      }
      return this.alumnoLastConnection;
        
    }

    editarAlumno(alumnoId: string, alumnoNombre: string) {
      Swal.fire({
        title: 'Editar a ' + alumnoNombre + '?',
        text: "Aqui podras editar todos los datos de " + alumnoNombre,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.dataApiService.setUser(alumnoId, this.dataApiService.getAlumnoType());
          this.router.navigate(['editar-alumno']);
        }
      })
    }

    eliminarAlumno(alumnoId: string, alumnoNombre: string) {
      Swal.fire({
        title: 'Desea eliminar a ' + alumnoNombre + '?',
        text: "No podras volver atras si deseas eliminar a " + alumnoNombre,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.dataApiService.eliminarAlumno(alumnoId);
          Swal.fire(
            'Alumno Eliminado Excitosamente!',
            alumnoNombre + ' ha sido eliminado',
            'success'
          );
          this.getAlumnos();
        }
      })
    }

    estadisticasAlumno(alumnoId: string, alumnoNombre: string) {
      Swal.fire({
        title: 'Ir a las estadisticas de ' + alumnoNombre + '?',
        text: "Aqui podras ver todas las estadisticas de " + alumnoNombre,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!'
      }).then((result) => {
        if (result.isConfirmed) {
          //REDIRECCIONAR A ESTADISTICAS
          Swal.fire(
            'PERFECTO!',
            'TE REDIRECCIONEst A ESTADISTICAS',
            'success'
          )
        }
      })
    }

    async validarTutor(password: string) {
      var tutorId = this.dataApiService.getUsuario();
      
      if (this.dataApiService.getUserType() == this.dataApiService.getAlumnoType()) {
        //ALumno tratando de entrar.
        await this.dataApiService.tutorByAlumno(this.dataApiService.getUsuario()).then(
          (respuesta) => {
            tutorId = respuesta;
          }
        );
        tutorId = tutorId.id;
        
      }
      //tutor tratando de entrar.
      var answer;
      await this.dataApiService.validarTutor(tutorId, password).then(
        (isValid) => {
          answer = isValid;
        }
      );
      return answer? true: false;
    }   
  }
