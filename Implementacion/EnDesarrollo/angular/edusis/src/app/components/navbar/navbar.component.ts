import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  profeLog = false;
  tutorLog = false;

  constructor(private dataApiService: DataApiService) {}

  ngOnInit() {}

  recargar() {
    console.log('AHORA ENTRÓ');
    if (this.dataApiService.usuario != null) {
      if (this.dataApiService.usuario.nombre === 'Profesor') {
        this.profeLog = true;
        this.tutorLog = false;
      }
      if (this.dataApiService.usuario.nombre === 'Tutor') {
        this.tutorLog = true;
        this.profeLog = false;
      }
    }
  }
}
