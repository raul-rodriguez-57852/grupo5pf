import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Addon } from 'src/app/models/addon';
import { Alumno } from 'src/app/models/alumno';
import { DataApiService } from 'src/app/services/data-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recompensas',
  templateUrl: './recompensas.component.html',
  styleUrls: ['./recompensas.component.css']
})
export class RecompensasComponent implements OnInit {

  alumnoID: number = null;
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
    listRecompensasEquipada: []
  };
  addons = [];
  listRecompensasComprada: Addon[] = [];
  listRecompensasEquipada: Addon[] = [];

  constructor(private dataApiService: DataApiService, private router: Router, private route: ActivatedRoute) {
    // Las siguientes tres lineas son para que recargue, sino al ser la misma pagina no recarga
    /* this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
    }; */
    var id: any;
    this.alumnoID = this.dataApiService.getUsuario();
  }

  ngOnInit(): void {
    console.log('ALUMNO: ', this.alumnoID)
    console.log('user: ', this.dataApiService.getUsuario())
    if (this.alumnoID != null) {
      this.getAlumno(this.alumnoID)
    }
    else {
      console.log('Error, no Student ID found!')
    }
    this.getAddons();
    this.actualizarAddons();
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
        this.alumno.recompensas = respuesta.recompensas;

      }
    )

  }

  getAddons() {
    this.dataApiService.getAddons().then((respuesta) => {
      this.addons = respuesta;
    });


  }

  actualizarAddons() {
    this.listRecompensasComprada = [];
    this.listRecompensasEquipada = [];
    this.dataApiService.getRecompensasAlumno(this.alumnoID.toString()).then(
      (respuesta) => {
        let map = respuesta;
        map.forEach(recompensa => {
          if (recompensa.equipado) {
            this.listRecompensasEquipada.push(recompensa.addon);
          } else {
            this.listRecompensasComprada.push(recompensa.addon);
          }
        });
      }
    )
    // recargamos el alumno asi se actualiza el saldo de estrrellas
    this.getAlumno(this.alumnoID);
  }

  isComprado(addon) {
    return this.listRecompensasComprada.some(add => add.id === addon.id)
  }

  isEquipado(addon) {
    return this.listRecompensasEquipada.some(add => add.id === addon.id)
  }


  async selectAddon(addon: any) {
    // Verificamos si el item esta dentro de la lista de comprados pero no equipados por el alumno
    if (this.isComprado(addon)) {
      // Consultamos si desea equipar
      const { value: respuesta } = await Swal.fire({
        title: '¿Desea equipar el item seleccionado?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: "Cancelar",
      })
      // Equipamos
      if (respuesta) {
        await this.dataApiService.equiparDesequiparAddon(this.alumnoID.toString(), addon.id).then(
          (respuesta) => {
            console.log(respuesta);

          });
      }

    } else {
      // Verificamos si el item esta dentro de la lista de comprados y equipados por el alumno
      if (this.isEquipado(addon)) {
        // Consultamos si desea desequipar
        const { value: respuesta } = await Swal.fire({
          title: '¿Desea desequipar el item seleccionado?',
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          cancelButtonText: "Cancelar",
        })
        // Desequipamos
        if (respuesta) {
          await this.dataApiService.equiparDesequiparAddon(this.alumnoID.toString(), addon.id).then(
            (respuesta) => {
              console.log(respuesta);

            });
        }

        // El addon no fue comprado verificamos si hay saldo suficiente para comprarlo  
      } else {
        if (this.alumno.saldoEstrellas < addon.costo) {
          Swal.fire({
            icon: 'error',
            title: 'Estrellas insuficientes para comprar este item',
            text: '¡A realizar mas tareas!',
          })
        } else {
          const { value: respuesta } = await Swal.fire({
            title: '¿Desea comprar el item seleccionado?',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: "Cancelar",
          })
          if (respuesta) {
            await this.dataApiService.comprarAddon(this.alumnoID.toString(), addon.id).then(
              (respuesta) => {
                console.log(respuesta);

              });
          }

        }
      }
    }
    this.actualizarAddons();

  }
}
