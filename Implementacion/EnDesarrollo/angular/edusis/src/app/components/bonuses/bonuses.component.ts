import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Alumno } from "src/app/models/alumno";
import { DataApiService } from "src/app/services/data-api.service";
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
import Swal from 'sweetalert2';
import { ConfettiLauncher } from 'src/app/services/confettiLauncher';


@Component({
  selector: "app-bonuses",
  templateUrl: "./bonuses.component.html",
  styleUrls: ["./bonuses.component.css", '../../../../node_modules/swiper/swiper-bundle.css'],
})

export class BonusesComponent implements OnInit {

  cursoId = null;
  swiper: Swiper;
  runningBonuses = false;
  tieneComodines = true;
  alumno: Alumno = {
    id: null,
    nombre: null,
    apellido: null,
    documento: null,
    tipoDocumento: null,
    fechaNacimiento: null,
    avatarUrl: null,
    passwordEmoji: null,
    tutorId: null,
    saldoEstrellas: null,
    mapRecompensas: null,
    isActive: true,
    recompensas: [],
    listRecompensasComprada: [],
    listRecompensasEquipada: [],
    cursoBonusAlumno: []
  };
  bonusPrice = 0;
  spinnerResult = null;
  activeBonuses = [];
  comodinesAlumno = [];
  comodinesDelCurso = [];
  listaComodines = [];
  curso;
  autoPlayInterval;

  constructor(
    private router: Router,
    private dataApiService: DataApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cursoId =
      this.route.snapshot.paramMap.get('id') != null
        ? Number(this.route.snapshot.paramMap.get('id'))
        : null;
    this.getCurso();
    this.getActiveBonuses();
    this.getAlumno(this.dataApiService.getUsuario());
    this.bonusPrice = this.getBonusPrice();
    this.swiper = this.getSwipper();
    this.swiper.autoplay.stop();
  }

  async getCurso() {
    this.dataApiService.getCurso(this.cursoId).then(
      (response)=> {
        this.curso = response;
    })
  }

  async getAlumno(id: string) {
    await this.dataApiService.getAlumno(id.toString()).then(
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
        this.alumno.cursoBonusAlumno = respuesta.cursoBonusAlumno;
        
        // Agrego los comodines correspondientes al alumno.
        const idEquipados = this.alumno.cursoBonusAlumno.filter(comodin => comodin.equipado);
        idEquipados.forEach((bonusEquipado) => {
          const comodin = this.comodinesDelCurso.filter(
            comodin => (
              comodin.id == bonusEquipado.bonus_reference
              && this.cursoId == bonusEquipado.curso_reference
            ));
          this.comodinesAlumno.push(...comodin);
        })
      }
    );
    this.actualizarAddons(parseInt(id));
  }

  cursoTieneComodinesActivados() {
    return this.curso.comodines_activados;
  }

  getBonusPrice() {
    return 100;
  }

  async getActiveBonuses() {
    await this.dataApiService.getBonusDelCurso(this.cursoId.toString()).then((respuesta) => {
      this.listaComodines = respuesta;
    });
    await this.listaComodines.forEach(bonusDelCurso => {
      const bonus = bonusDelCurso.bonus;
      bonus.equipado = bonusDelCurso.equipado;
      if (bonus.equipado) {
        this.comodinesDelCurso.push(bonus);
      }
    });
  }

  async actualizarAddons(id: number) {
    this.alumno.listRecompensasComprada = [];
    this.alumno.listRecompensasEquipada = [];
    this.dataApiService
      .getRecompensasAlumno(id.toString())
      .then((respuesta) => {
        let map = respuesta;
        map.forEach((recompensa) => {
          if (recompensa.equipado) {
            this.alumno.listRecompensasEquipada.push(recompensa.addon);
          } else {
            this.alumno.listRecompensasComprada.push(recompensa.addon);
          }
        });
      });
  }

  canjearBonus() {
    if (this.alumno.saldoEstrellas < this.bonusPrice) {
      Swal.fire({
        title: 'Saldo insuficiente :(',
        text: '¡A realizar mas tareas!',
        icon: 'info',
      });
      return;
    }
    if (!this.cursoTieneComodinesActivados() || this.comodinesDelCurso.length == 0) {
      Swal.fire({
        title: 'Opps :(',
        text: '¡Este curso no tiene actiivado los comodines!',
        icon: 'info',
      });
      return;
    }
    this.showModal();
  }

  startSpinner() {
    setTimeout(() => {
      this.swiper.autoplay.start();
    }, 100);
    this.runningBonuses = true;
  }

  purhcaseBonus() {
    this.runningBonuses = false;
    this.swiper.autoplay.stop();
    const result = document.getElementsByClassName('swiper-slide swiper-slide-visible swiper-slide-active')[0].id;
    this.spinnerResult = result;
    const comodinObtenido = this.comodinesDelCurso.find((bonus) => bonus.id == result);
    this.registrarBonusComoAdquirido(comodinObtenido);
  }

  async registrarBonusComoAdquirido(comodin: any) {
    this.dataApiService.descontarEstrellasPorBonus(this.dataApiService.getUsuario(), this.getBonusPrice().toString()).then((response) => {
      this.commitPurchase(comodin);
    }).catch((respuesta) => {
      Swal.fire(
        "Opps, algo salio mal ;(",
        respuesta.error.message,
        'error'
      )
    });
  }

  async commitPurchase(comodin: any) {
    if (this.comodinesAlumno.includes(comodin)) {
      Swal.fire({
        title: 'Ups, que lastima',
        imageUrl: comodin.imagen,
        text: 'Ya posees este comodin, mejor suerte la proxima...',
        confirmButtonColor: '#40a944',
        icon: 'warning'
      });
      this.refreshAlumnoBonuses();
      this.hideModal();
    } else {
      let confettiLauncher = new ConfettiLauncher();
      confettiLauncher.dispararConfetti(0.5, 0.5);
      await this.dataApiService.agregarBonusAlAlumno(
        this.dataApiService.getUsuario(),
        comodin.id,
        this.cursoId
      ).then((response) => {
        this.refreshAlumnoBonuses();
      })
    }
  }

  showModal() {
    const bonusContainer = document.getElementById('bonus-container');
    const rect = document.getElementById("canjear").getBoundingClientRect();
    let cordenadasCerrar = document.getElementById("closeModal").getBoundingClientRect();
    bonusContainer.addEventListener('touchstart', (event) => {
      if (event.touches.length > 0) {
        var touchX = event.touches[0].clientX;
        var touchY = event.touches[0].clientY;
      }
      if ((touchX <= rect.right) && (touchY <= rect.bottom) && (touchY >= rect.top)) {
        if (this.runningBonuses) {
          this.purhcaseBonus();
        }
      } else {
        let puntoMedioBotonCerrar = cordenadasCerrar.left + (cordenadasCerrar.right - cordenadasCerrar.left)
        if (touchY >= cordenadasCerrar.top && touchY <= cordenadasCerrar.bottom && Math.abs(touchX - puntoMedioBotonCerrar) <= 50 ) {
          this.hideModal();
        }
      }
    });
    bonusContainer.classList.add('show');
    this.runningBonuses = true;
    this.startSpinner();
  }

  startCustomAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.swiper.slideNext();
    }, 20);
  }

  refreshAlumnoBonuses() {
    this.comodinesAlumno = [];
    this.getAlumno(this.dataApiService.getUsuario());
  }

  hideModal() {
    const bonusContainer = document.getElementById('bonus-container');
    bonusContainer.classList.remove('show');
    this.swiper.autoplay.stop();
  }

  getSwipper() {
    register();
    return new Swiper('.swiper', {
      touchEventsTarget: 'container',
      preventInteractionOnTransition: false,
      spaceBetween: 100,
      loop: true,
      allowTouchMove: false,
      preventClicks: false,
      simulateTouch: false,
      autoplay: { delay: 0 },
      effect: 'fade',
      fadeEffect: { crossFade: true },
      speed: 50,
    });
  }

  async getBonusesAsHtmlSlides() {
    const htmlArray = [];
    this.activeBonuses.forEach(function (bonus) {
      htmlArray.push('<div class="swiper-slide" id="' + bonus.id + '">' +
        '<div class="bonus-title">' + bonus.title + '</div>' +
        '<img  class="bonus-image" src="' + bonus.img + '" loading="lazy">' +
        '<div class="swiper-lazy-preloader"></div>' +
        '<div class="bonus-description">' + bonus.description + '</div>' +
        '</div>');
    });
    return htmlArray;
  }

  showActiveBonus(comodin: any) {
    Swal.fire({
      title: comodin.nombre,
      imageUrl: comodin.imagen,
      text: comodin.descripcion,
      confirmButtonColor: '#40a944',
      confirmButtonText: 'Volver',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Eliminar comodin'
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        const comodinToDelete = this.alumno.cursoBonusAlumno.filter(somBonus => somBonus.bonus_reference == comodin.id);
        const comodinBonusAlumnoToDelete = [...comodinToDelete][0];
        this.dataApiService.eliminarComodinAlumno(comodinBonusAlumnoToDelete.id).then((result) => {
          this.refreshAlumnoBonuses();
          Swal.fire(
            'Borrado',
            'El bonus ha sido eliminado.',
            'success'
          )
        })
      }
    });
  }

  showNoActiveBonus(comodin: any) {
    Swal.fire({
      title: comodin.nombre,
      icon: 'error',
      imageUrl: comodin.imagen,
      text: 'Los comodines estan desactivados',
      imageHeight: 300,
      confirmButtonColor: '#40a944',
      confirmButtonText: 'Volver',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Eliminar comodin'
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        const comodinToDelete = this.alumno.cursoBonusAlumno.filter(somBonus => somBonus.bonus_reference == comodin.id);
        const comodinBonusAlumnoToDelete = [...comodinToDelete][0];
        this.dataApiService.eliminarComodinAlumno(comodinBonusAlumnoToDelete.id).then((result) => {
          this.refreshAlumnoBonuses();
          Swal.fire(
            'Borrado',
            'El bonus ha sido eliminado.',
            'success'
          )
        })
      }
    });
  }
}