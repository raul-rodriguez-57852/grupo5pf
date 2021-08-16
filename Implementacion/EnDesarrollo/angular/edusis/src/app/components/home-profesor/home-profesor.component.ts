import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../../services/navbar-service';


@Component({
  selector: 'app-home-profesor',
  templateUrl: './home-profesor.component.html',
  styleUrls: ['./home-profesor.component.css']
})
export class HomeProfesorComponent implements OnInit {

  constructor(
    private router: Router,
    private navbarService: NavbarService
    
  ) { }

  ngOnInit(): void {
    this.navbarService.triggerNavbarGet();
  }

  misCursos() {
    this.router.navigate(['cursos']);
  }

  misActividades() {
    this.router.navigate(['crear-actividad']);
  }

  misEstadisticas() {
    this.router.navigate(['estadisticas-profesor']);
  }

}
