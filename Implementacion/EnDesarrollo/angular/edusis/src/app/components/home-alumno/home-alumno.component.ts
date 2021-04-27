import { Component, OnInit, ElementRef, SystemJsNgModuleLoader } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { Alumno } from '../../models/alumno';
import { Curso } from '../../models/curso';
import { Router, UrlHandlingStrategy, ActivatedRoute } from '@angular/router';
import { CompileStylesheetMetadata } from '@angular/compiler';

@Component({
  selector: 'app-home-alumno',
  templateUrl: './home-alumno.component.html',
  styleUrls: ['./home-alumno.component.css']
})

export class HomeAlumnoComponent implements OnInit {

    alumno: Alumno = { nombre: null, apellido: null, documento: null, tipoDocumento: null, fechaNacimiento: null, avatarUrl: null, passwordEmoji: null, tutorId: null};
    curso: Curso = {id: null, nombre: null, iconoURL: null, creadorId: null, codigo:null }
    cursos = [];
    mensaje: string = null;
    alumnoID: number = null;
    codigoCurso: string = null;
    chek_codigo: number = null;
    esregistro = false;
    //thisId

    constructor( private dataApiService: DataApiService,private elementRef: ElementRef,private router: Router,private route: ActivatedRoute)
    {
      // Las siguientes tres lineas son para que recargue, sino al ser la misma pagina no recarga
        this.router.routeReuseStrategy.shouldReuseRoute = function() {
          return false;
        };
        var id: any;
        this.alumnoID = this.router.getCurrentNavigation().extras.state.id != null ?  this.router.getCurrentNavigation().extras.state.id : null;
    }

    ngOnInit(){
        
        if(this.alumnoID != null){
            this.getAlumno(this.alumnoID)
        }
        else{
            console.log('Error, no Student ID found!')
        }
        this.getAllCursos();
    }

    getAlumno(id: number){
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

            }
        )
    }

    getCursosAlumno(id: number){
        //Devuelve todos los cursos del alumno cuyo alumno.id == id

    }

    
    async regsitroCurso(){
        //Checkeamos que halla ingresado un codigo de curso
        this.codigoCurso = (<HTMLInputElement>document.getElementById('InputCodigoCurso')).value.toString();
        if(this.codigoCurso != ''){
            //operamos
            console.log('Codigo ingresado = ',this.codigoCurso);
            await this.dataApiService.buscarCursoPorCodigo(this.codigoCurso).then(
                (respuesta) => {
                    this.chek_codigo = respuesta;
                    if(this.chek_codigo != -1){
                        console.log('CURSO ENCONTRADO! \nID CURSO: ',this.chek_codigo);
                    }
                    else{
                        this.mensaje = "Lo siento, curso no encontrado!"
                    }
                }
            )
            .catch((error) =>{
                this.mensaje = "Lo siento, ocurrio un error al buscar ese curso";
                document.getElementById('open-modal').click();
            });
        }
        else{
            this.mensaje = "Debes ingresar un codigo de invitacion a curso!"
            document.getElementById('open-modal').click();
        }

        
        if(this.chek_codigo != -1){
            //Traigo el curso para mostrarle los datos y que confirme el registro.
            console.log('This.check.codigo = ',this.chek_codigo);
            await this.dataApiService.getCurso(this.chek_codigo.toString()).then(
                (respuesta) => {
                    this.curso = respuesta;
                }
            )
            .catch(() =>{
                this.mensaje = "Error al buscar el curso!";
                document.getElementById('open-modal').click();

            });
        }
        this.esregistro = true;
        this.mensaje = "¡Curso Encontrado! \nNombre del curso: " + this.curso.nombre + '\n¿Desea unirse al curso?';
        document.getElementById('open-modal').click();

    }

    getAllCursos(){
        //Mostrar todos los cursos del alumno.
        console.log('Buscando todos los cursos del alumno!');
        this.dataApiService.getCursosDeAlumno(this.alumnoID.toString()).then(
            (respuesta) => {
                this.cursos = respuesta;
                console.log("Cursos: \n", this.cursos);
            }
        )
    }

    irACurso(id: number) {
      this.router.navigate(['curso-alumno', { id }]);
    }


    confirmarRegistro(){
        console.log('Estoy en confirmar registro \n check_codigo= ',this.chek_codigo);
        if(this.chek_codigo != -1){
            console.log('Entro en el if de check_codigo != -1 /n llamando a agregarAlumnoACurso');
            this.dataApiService.agregarAlumnoACurso(this.alumnoID.toString(), this.curso.id.toString()).then(
                (respuesta) => {
                  this.recargar();
                    this.mensaje = "Te has unido correctamente al curso.";
                    this.esregistro = false;
                    document.getElementById('open-modal').click();
                }
            )
            .catch(() =>{
    
                this.mensaje = "Se produjo un error intentando registrarse al curso.";
                this.esregistro = false;
                document.getElementById('open-modal').click();
            });    
        }
    }

    recargar() {
      console.log('ENTRÓ');
      this.router.navigate(['home-alumno'], {state: {id: this.alumnoID}});
    }
}