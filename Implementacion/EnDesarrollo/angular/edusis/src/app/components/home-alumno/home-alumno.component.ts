import { Component, OnInit, ElementRef, SystemJsNgModuleLoader } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { Alumno } from '../../models/alumno';
import { Curso } from '../../models/curso';
import { Router, UrlHandlingStrategy, ActivatedRoute } from '@angular/router';
import { CompileStylesheetMetadata } from '@angular/compiler';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-home-alumno',
    templateUrl: './home-alumno.component.html',
    styleUrls: ['./home-alumno.component.css']
})

export class HomeAlumnoComponent implements OnInit {

    alumno: Alumno = { id: null, nombre: null, apellido: null, documento: null, tipoDocumento: null, fechaNacimiento: null, avatarUrl: null, passwordEmoji: null, tutorId: null, saldoEstrellas: null, mapRecompensas: null };
    curso: Curso = { id: null, nombre: null, iconoURL: null, creadorId: null, codigo: null }
    cursos = [];
    mensaje: string = null;
    alumnoID: number = null;
    codigoCurso: string = null;
    chek_codigo: number = null;
    esregistro = false;
    //thisId

    constructor(private dataApiService: DataApiService, private elementRef: ElementRef, private router: Router, private route: ActivatedRoute) {
        // Las siguientes tres lineas son para que recargue, sino al ser la misma pagina no recarga
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        var id: any;
        this.alumnoID = this.router.getCurrentNavigation().extras.state.id != null ? this.router.getCurrentNavigation().extras.state.id : null;
    }

    ngOnInit() {
        if (this.alumnoID != null) {
            this.getAlumno(this.alumnoID)
        }
        else {
            console.log('Error, no Student ID found!')
        }
        this.getAllCursos();
    }

    getAlumno(id: number) {
        this.dataApiService.getAlumno(id.toString()).then(
            (respuesta) => {
                //console.log(respuesta);
                this.alumno.nombre = respuesta.nombre;
                this.alumno.apellido = respuesta.apellido;
                this.alumno.documento = respuesta.documento;
                this.alumno.tipoDocumento = respuesta.tipoDocumento;
                this.alumno.fechaNacimiento = respuesta.fechaNacimiento;
                this.alumno.avatarUrl = respuesta.avatarUrl;
                this.alumno.passwordEmoji = respuesta.passwordEmoji;
                this.alumno.tutorId = respuesta.tutorId;
                this.alumno.saldoEstrellas = respuesta.saldoEstrellas;

            }
        )
    }

    getCursosAlumno(id: number) {
        //Devuelve todos los cursos del alumno cuyo alumno.id == id

    }


    async regsitroCurso() {
        this.esregistro = false;
        //Checkeamos que halla ingresado un codigo de curso
        this.codigoCurso = (<HTMLInputElement>document.getElementById('InputCodigoCurso')).value.toString();
        if (this.codigoCurso == '') {
            Swal.fire(
                'Upss',
                'Recuerda que debes ingresar un codigo para unirte al curso',
                'warning'
            )
            return;
        }

        //Nos fijamos si el curso deseado exite.
        await this.dataApiService.buscarCursoPorCodigo(this.codigoCurso).then(
            (respuesta) => {
                this.chek_codigo = respuesta;
            }
        );

        if (this.chek_codigo == -1) {
            Swal.fire(
                'Upss',
                'No encontramos el curso que deseas',
                'warning'
            );
            //Vaciamos el input.
            (<HTMLInputElement>document.getElementById('InputCodigoCurso')).value = '';
            return;
        }


        //curso encontrado.
        await this.dataApiService.getCurso(this.chek_codigo.toString()).then(
            (respuesta) => {
                this.curso = respuesta;
                this.esregistro = true;
            }
        ).catch(() => {
            Swal.fire(
                'Upss',
                'Algo salio mal :(',
                'error'
            );
            //Vaciamos el input.
            (<HTMLInputElement>document.getElementById('InputCodigoCurso')).value = '';

        });
        // Agregar nombre al curso en popup
        Swal.fire({
            title: 'Encontramos tu curso!',
            text: "Deseas unirte a este curso?",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#a5dc86',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Quiero unirme!',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                this.confirmarRegistro();
            }
        })
    }

    getAllCursos() {
        this.dataApiService.getCursosDeAlumno(this.alumnoID.toString()).then(
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
        if (this.chek_codigo != -1) {
            this.dataApiService.agregarAlumnoACurso(this.alumnoID.toString(), this.curso.id.toString()).then(
                (respuesta) => {
                    this.recargar();
                    Swal.fire(
                        'Felicitaciones!',
                        'Ya formas parte del curso!',
                        'success'
                    );
                    this.esregistro = false;
                }
            )
                .catch(() => {
                    Swal.fire(
                        'Upss',
                        'Algo salio mal al registrarse al curso :(',
                        'error'
                    );
                    this.esregistro = false;
                });
        }
    }

    recargar() {
        this.router.navigate(['home-alumno'], { state: { id: this.alumnoID } });
    }
}