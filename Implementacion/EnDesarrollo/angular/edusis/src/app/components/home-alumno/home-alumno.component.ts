import { Component, OnInit, ElementRef } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { Alumno } from '../../models/alumno';
import { Curso } from '../../models/curso';
import { Router, UrlHandlingStrategy, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-home-alumno',
    templateUrl: './home-alumno.component.html',
    styleUrls: ['./home-alumno.component.css']
})

export class HomeAlumnoComponent implements OnInit {

    alumno: Alumno = { id: null, nombre: null, apellido: null, documento: null, tipoDocumento: null, fechaNacimiento: null, avatarUrl: null, passwordEmoji: null, tutorId: null, saldoEstrellas: null, recompensas: null, listRecompensasComprada: null, listRecompensasEquipada: null, isActive: true, mapRecompensas: null };
    curso: Curso = { id: null, nombre: null, imagen: null, creadorId: null, codigo: null }
    cursos = [];
    mensaje: string = null;
    codigoCurso: string = null;
    chek_codigo: number = null;
    esregistro = false;

    constructor(private dataApiService: DataApiService, private elementRef: ElementRef, private router: Router, private route: ActivatedRoute) {
        // Las siguientes tres lineas son para que recargue, sino al ser la misma pagina no recarga
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        var id: any;
    }

    ngOnInit() {
        this.getAlumno(this.dataApiService.getUsuario());
        this.getAllCursos();
    }

    getAlumno(id: string) {
        this.dataApiService.getAlumno(id).then(
            (respuesta) => {
                this.alumno.nombre = respuesta.nombre;
                this.alumno.apellido = respuesta.apellido;
                this.alumno.documento = respuesta.documento;
                this.alumno.tipoDocumento = respuesta.tipoDocumento;
                this.alumno.fechaNacimiento = respuesta.fechaNacimiento;
                this.alumno.avatarUrl = respuesta.avatarUrl;
                this.alumno.passwordEmoji = respuesta.passwordEmoji;
                this.alumno.tutorId = respuesta.tutorId;
                this.alumno.saldoEstrellas = respuesta.saldoEstrellas;
                this.actualizarAddons(parseInt(id));
            }
        )
    }

    actualizarAddons(id: number) {
      this.alumno.listRecompensasComprada = [];
      this.alumno.listRecompensasEquipada = [];
      this.dataApiService.getRecompensasAlumno(id.toString()).then(
        (respuesta) => {
          let map = respuesta;
          map.forEach(recompensa => {
            if (recompensa.equipado) {
              this.alumno.listRecompensasEquipada.push(recompensa.addon);
            } else {
              this.alumno.listRecompensasComprada.push(recompensa.addon);
            }
          });
        }
      )        
    }

    getCursosAlumno(id: number) {
        //Devuelve todos los cursos del alumno cuyo alumno.id == id
    }

    async regsitroCurso() {
        this.esregistro = false;
        this.codigoCurso = (<HTMLInputElement>document.getElementById('InputCodigoCurso')).value.toString();
        if (this.codigoCurso == '') {
            Swal.fire(
                'Upss',
                'Recuerda que debes ingresar un codigo para unirte al curso',
                'warning'
            )
            return;
        }

        await this.dataApiService.buscarCursoPorCodigo(this.codigoCurso).then(
            (respuesta) => {
                if (respuesta != -1) {
                    this.curso = respuesta;
                    this.esregistro = true;
                    this.chek_codigo = 0;
                } else {
                    this.chek_codigo = respuesta;
                }
            }
        );
        if (this.chek_codigo == -1) {
            Swal.fire(
                'Upss',
                'No encontramos el curso que deseas',
                'warning'
            );
            (<HTMLInputElement>document.getElementById('InputCodigoCurso')).value = '';
            return;
        }
        
        Swal.fire({
            title: 'Encontramos tu curso!',
            text: "Deseas unirte al curso: " + this.curso.nombre + "?",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#a5dc86',
            confirmButtonText: 'Si, Quiero unirme!',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed && this.chek_codigo != -1) {
                this.confirmarRegistro();
            }
        })
    }

    getAllCursos() {
        this.dataApiService.getCursosDeAlumno(this.dataApiService.getUsuario()).then(
            (respuesta) => {
                this.cursos = respuesta;
            }
        )
    }

    irACurso(id: number) {
        this.router.navigate(['curso-alumno', { id }]);
    }

    irRecompensas() {
        this.router.navigate(['recompensas']);
    }


    confirmarRegistro() {
        this.dataApiService.agregarAlumnoACurso(this.dataApiService.getUsuario(), this.curso.id.toString())
        .then(
            (respuesta) => {
                this.recargar();
                Swal.fire(
                    'Felicitaciones!',
                    'Ya formas parte del curso!',
                    'success'
                );
                this.esregistro = false;
            }
        ).catch(() => {
            Swal.fire(
                'Upss',
                'Algo salio mal al registrarse al curso :(',
                'error'
            );
            this.esregistro = false;
        });
    }

    recargar() {
        this.router.navigate(['home-alumno'], { state: { id: this.dataApiService.getUsuario() } });
    }
}