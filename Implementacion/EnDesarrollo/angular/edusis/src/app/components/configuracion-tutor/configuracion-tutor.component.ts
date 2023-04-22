import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import Swal from 'sweetalert2';
import { Curso } from 'src/app/models/curso';
import { Asignatura } from 'src/app/models/asignatura';
import { DataTareaService } from 'src/app/services/data-tarea.service';

@Component({
    selector: 'app-configuracion-tutor',
    templateUrl: './configuracion-tutor.component.html',
    styleUrls: ['./configuracion-tutor.component.css'],
  })

  export class ConfiguracionTutorComponent implements OnInit{
    alumno: Alumno = {
      id: null, nombre: null, apellido: null, documento: null, tipoDocumento: null, fechaNacimiento: null, avatarUrl: null, passwordEmoji: null, tutorId: null, saldoEstrellas: null, mapRecompensas: null, isActive: true,
      recompensas: [],
      listRecompensasComprada: [],
      listRecompensasEquipada: []
    };
    urlImagen = "assets\\img\\empty-classroom-stock-image.jpg";
    tituloDePagina: string = 'Configuración';
    alumnos = [];
    showChartEstadisticas: boolean = false;
    emojis = [];
    alumnoLastConnection = null;
    password: string;
    cursos: Array<Curso> = [];
    asignaturas: Array<Asignatura> = [];
    tuplaPuntaje = [];
    public chartDatasets = [{ data: [], label: "" }];
    public chartLabels: Array<any> = [];
    public chartOptions: any = {
      responsive: true,
      legend: {
        display: false,
        labels: {
          fontColor: 'rgb(255, 255, 255)'
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            suggestedMin: 0,
            suggestedMax: 100,
            fontColor: 'rgb(255, 255, 255)'
  
          }
        }],
        xAxes: [{
          ticks: {
            fontSize: 10,
            fontColor: 'rgb(255, 255, 255)'
          }
        }]
      }
    }

    constructor(
    private router: Router,
    private dataApiService: DataApiService,
    private dataTareaService: DataTareaService
    ) {}
      
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
        this.router.navigate(['/']);
        return;
      } 
      
      if (password) {
        var result =  await this.validarTutor(password);
        if(result) {
          this.dataApiService.deleteCookie(this.dataApiService.studentCookie);
          
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

       // no necesito un grado tan preciso

      if (delta < hour / 2) {
        this.alumnoLastConnection = 'hace unos minutos';
      } else if (Math.floor(delta / hour) == 1) {
        this.alumnoLastConnection = 'hace una hora.'
      } else if (delta < day) {
        this.alumnoLastConnection = 'Hoy';
      } else if (delta < day * 2) {
        this.alumnoLastConnection = 'ayer';
      }else if (delta < week + day) {
        this.alumnoLastConnection = 'El ' + diasSemana[userDate.substr(0, 3)] + ' pasado.';
      }
      else{
        this.alumnoLastConnection = 'El ' + diasSemana[userDate.substr(0, 3)] + ' ' + userDate.substr(8,2) + ' de  ' + meses[userDate.substr(4, 3)];
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
          //Tengo que editar el alumno,pero no quiero cambiar el user.
          this.dataApiService.setCookie(this.dataApiService.studentCookie, alumnoId);
          this.router.navigate(['editar-alumno']);
        }
      })
    }

    async eliminarAlumno(alumnoId: string, alumnoNombre: string) {
      Swal.fire({
        title: 'Desea eliminar a ' + alumnoNombre + '?',
        text: "No podras volver atras si deseas eliminar a " + alumnoNombre,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.dataApiService.eliminarAlumno(alumnoId);
          Swal.fire(
            'Alumno Eliminado exitosamente!',
            alumnoNombre + ' ha sido eliminado',
            'success'
          );
          this.getAlumnos();
        }
      })
    }

    async estadisticasAlumno(alumnoId: string, alumnoNombre: string) {
    await this.getCursosAlumno(alumnoId);
    var cursoOptions = {};
    this.cursos.forEach(function (cursito) {
      cursoOptions[cursito.id] = cursito.nombre;
    })
      const { value: cursoId } = await Swal.fire({
        title: '¿Que curso deseas ver?',
        input: 'select',
        inputOptions: cursoOptions,
        inputPlaceholder: 'Elija un curso de ' + alumnoNombre,
        showCancelButton: true,
      })
      
      if (cursoId) {
        await this.getAsignaturas(cursoId);
        this.asignaturasPopUp(cursoId, alumnoId, alumnoNombre);
      }

    }

    async asignaturasPopUp(cursoId: string, alumnoId: string, alumnoNombre: string) {
      var asignaturaOptions = {};
      this.asignaturas.forEach(function (asignaturita) {
        asignaturaOptions[asignaturita.id] = asignaturita.nombre;
      })
      const { value: asignatura } = await Swal.fire({
        title: '¿Que asignatura quieres ver?',
        input: 'select',
        inputOptions: asignaturaOptions,
        inputPlaceholder: 'Elija una asignatura',
        showCancelButton: true,
      })
      
      if (asignatura) {
        await this.getChartPuntajes(cursoId, alumnoId, asignatura);
        this.tituloDePagina = 'Estadísticas de ' + alumnoNombre;
        this.showChartEstadisticas = true
      }
    }

    volver(aPerfiles: boolean = true) {
      if (aPerfiles) {
        this.router.navigate(['perfiles']);
      } else {
        this.showChartEstadisticas = false;
        this.tituloDePagina = 'Configuracíon';
      }
      
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

    async getCursosAlumno(alumnoId: string) {
      await this.dataApiService.getCursosDeAlumno(alumnoId).then(
          (respuesta) => {
            this.cursos = respuesta;
          }
      )
    }

    async getAsignaturas(cursoId: string) {
      await this.dataApiService.getAsignaturas(Number(cursoId)).then(
        (asignaturas) => {
        this.asignaturas = asignaturas;
        }
      )
    }

    async getChartPuntajes(cursoId: string, alumnoId: string, asignaturaId: string) {
      await this.dataTareaService.getPuntajeAlumnoAcumulado(Number(cursoId), Number(alumnoId), Number(asignaturaId)).then(
        (puntajes) => {
          this.tuplaPuntaje = puntajes;
          puntajes.sort(function (a, b) { return (a["fecha"] > b["fecha"]) ? 1 : ((b["fecha"] > a["fecha"]) ? -1 : 0); });
          let puntos = [];
          let fechas = [];
          puntajes.forEach(element => {
            puntos.push(element["puntajeMaximo"]);
            if (element["fecha"] != null) {
              var date = new Date(element["fecha"]);
  
              element["fecha"] = date.toLocaleDateString();
            } else {
              element["fecha"] = "";
            }
            let label = element["nombre"];
            fechas.push(label);
          });
  
          this.chartDatasets = [
            { data: puntos, label: "Cantidad de puntos por tarea" },
          ];
          this.chartLabels = fechas;
  
        }
      );
    }
    

  }
