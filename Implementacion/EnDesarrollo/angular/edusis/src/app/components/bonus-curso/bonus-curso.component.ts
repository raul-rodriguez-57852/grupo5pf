import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DataApiService } from "src/app/services/data-api.service";
import Swal from 'sweetalert2';
import { DataTareaService } from 'src/app/services/data-tarea.service';
import { empty } from "rxjs";


@Component({
  selector: "app-bonus-curso",
  templateUrl: "./bonus-curso.component.html",
  styleUrls: ["./bonus-curso.component.css"],
})

export class BonusCursoComponent implements OnInit {

  bonusCurso = [];
  cursoId = null;
  listaComodines = [];
  listaComodinesCurso = [];
  cursoHasComodines = false;
  curso = null;
  alumnosDelCurso = [];
  specificAlumnoBonuses = [];
  currentAlumnoComodines = [];
  dataAlumnos = [];
  constructor(
    private router: Router,
    private dataApiService: DataApiService,
    private route: ActivatedRoute,
    private dataTareaService: DataTareaService
  ) { }


  ngOnInit(): void {
    this.cursoId =
      this.route.snapshot.paramMap.get('id') != null
        ? Number(this.route.snapshot.paramMap.get('id'))
        : null;
    this.getCurso();
    this.getComodinesDelCurso();
  }

  async getComodinesDelCurso() {
    // ACa busuca solo los del curso, revisa metodo en el back y fijate que tengas bien la api en dataapiserviece.
    await this.dataApiService.getBonusDelCurso(this.cursoId.toString()).then((respuesta) => {
      this.listaComodines = respuesta;
    })
    this.listaComodines.forEach(bonusDelCurso => {
      const bonus = bonusDelCurso.bonus;
      bonus.equipado = bonusDelCurso.equipado
      this.listaComodinesCurso.push(bonus);
    });
  }

  async getCurso() {
    await this.dataApiService.getCurso(this.cursoId.toString()).then((response) => {
      this.curso = response;
      if (response.comodines_activados !== null) {
        this.cursoHasComodines = response.comodines_activados;
      }
    })
  }

  activarComodines() {
    const modalText = this.getCorrectMessageForModal(this.cursoHasComodines);
    Swal.fire({
      icon: 'question',
      title: modalText.title,
      text: modalText.description,
      confirmButtonColor: modalText.buttonColor,
      confirmButtonText: modalText.buttonText,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.cursoHasComodines = this.cursoHasComodines ? false : true;
        this.dataApiService.activarDesactivarComodin(this.cursoId.toString());
      }
    })
  }

  getCorrectMessageForModal(cursoHasComodines: boolean) {
    if (cursoHasComodines) {
      return {
        title: 'Desactivar comodines',
        description: 'Estas seguro? Esto implicara que se pierdan todos los comodines de los alumnos.',
        buttonText: 'Si, desactivar',
        buttonColor: '#dc3545'
      }
    } else {
      return {
        title: 'Activar comodines',
        description: 'Enhorabuena! Los comodines pueden resultar muy util para mejorar la dinamica de aprendisaje y fomentar el esfuerzo por aprender!',
        buttonText: 'Si, activar',
        buttonColor: '#28a745'
      }
    }
  }

  visualizarComodin(comodin: any) {
    Swal.fire({
      title: comodin.nombre,
      html: '<img style="width: 90%; height: 100%" src="' + comodin.imagen + '"/>',
      footer: comodin.descripcion,
      confirmButtonText: comodin.equipado ? 'Desactivar comodin' : 'Activar comodin',
      confirmButtonColor: comodin.equipado ? '#dc3545' : '#28a745',
      showCancelButton: true,
      cancelButtonText: 'Atras'
    }).then((result) => {
      if (result.isConfirmed) {
        this.listaComodinesCurso.map(cursoComodin => {
          if (cursoComodin.id == comodin.id) {
            cursoComodin.equipado = !comodin.equipado
            this.dataApiService.activarDesactivarBonusAlCurso(this.cursoId, comodin.id);
          }
        })
      }
    })
  }

  volver() {
    this.router.navigate(['cursos']);
  }

  async mostrarEstadisticas() {
    await this.dataApiService.getBonusAlumnoByCurso(this.cursoId).then((response) => {
      if (response) {
        this.dataAlumnos = response.filter((bonuses) => bonuses.bonuses.length != 0);
      }
    })
    if (this.dataAlumnos.length == 0) {
      Swal.fire({
        title: 'Ups...',
        text: 'Ningun alumno posee comodines para este curso... :(',
        icon: 'warning'
      })
      return;
    }
    this.showModal();
  }

  hideModal() {
    const bonusContainer = document.getElementById('estadisticas-modal');
    bonusContainer.classList.remove('show');
  }

  showModal() {
    const bonusContainer = document.getElementById('estadisticas-modal');
    bonusContainer.classList.add('show');
  }

  hideModalAlumno() {
    const bonusContainer = document.getElementById('bonus-alumno-modal-container');
    bonusContainer.classList.remove('show');
    const alumnos = document.getElementById('estadisticas-modal');
    alumnos.classList.remove('showBackground');
  }

  showModalAlumno(dataAlumno: any) {
    this.currentAlumnoComodines = dataAlumno.bonuses.map(comodin => ({ ...comodin, 'alumno_nombre': dataAlumno.alumno_nombre }));
    const bonusContainer = document.getElementById('bonus-alumno-modal-container');
    bonusContainer.classList.add('show');
    const alumnos = document.getElementById('estadisticas-modal');
    alumnos.classList.add('showBackground');
  }

  async getAlumnosDelCurso() {
    await this.dataTareaService.getAlumnosPorCurso(this.cursoId).then((response) => {
      const allAlumnos = response;
      allAlumnos.filter(alumno => (
        alumno.cursoBonusAlumno.filter(bonusCurso => (bonusCurso.curso_reference == this.cursoId))
      ));
      this.alumnosDelCurso = allAlumnos;
    })
  }

  eliminarComodinDelAlumno(bonusCursoAlumno: any) {
    Swal.fire({
      title: 'Seguro que desea eliminar el comodin a ' + bonusCursoAlumno.alumno_nombre + '?: ',
      imageUrl: bonusCursoAlumno.bonus_imagen,
      text: bonusCursoAlumno.alumno_nombre + ' perdera el comodin...',
      confirmButtonColor: '#40a944',
      confirmButtonText: 'Volver',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Eliminar comodin'
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        this.dataApiService.eliminarComodinAlumno(bonusCursoAlumno.CursoBonusAlumno_id).then((result) => {
          Swal.fire(
            'Borrado',
            'El bonus ha sido eliminado.',
            'success'
          ).then((something) => {
            this.hideModalAlumno();
            this.hideModal();
          })
        })
      }
    });
  }

}