import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  irARegistro(id) {
    this.router.navigate(['registro'], {state: {id: id}});
  }

  irAInicioSesion(id) {
    this.router.navigate(['inicio-sesion'], {state: {id: id}});
  }
}
