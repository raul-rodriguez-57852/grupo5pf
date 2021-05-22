import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataApiService } from '../../services/data-api.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
})
export class InicioSesionComponent implements OnInit {
  esCuentaTutor = true;
  mensaje: string = null;
  documento: string = null;
  password: string = null;

  constructor(private dataApiService: DataApiService,private router: Router)
   {
      var id: any;
    
      if(this.router.getCurrentNavigation().extras.state.id != 3)
      {
        if (this.router.getCurrentNavigation().extras.state.id == 1)
        {
          this.esCuentaTutor = false;
        }
        else
        {
          this.esCuentaTutor = true;
    
        }
        console.log(this.router.getCurrentNavigation().extras.state.id); 
      }
      else{
        this.router.navigate(['home']);
      }
  }

  ngOnInit() {}

  iniciar(formInicioSesion: NgForm) {
    
  }

  cambiarTipoCuenta() {
    if (this.esCuentaTutor === true) {
      this.esCuentaTutor = false;
    } else {
      this.esCuentaTutor = true;
    }
    this.ngOnInit();
  }

  recargar(id) {
    this.router.navigate(['inicio-sesion'], {state: {id: id}});
  }
}
