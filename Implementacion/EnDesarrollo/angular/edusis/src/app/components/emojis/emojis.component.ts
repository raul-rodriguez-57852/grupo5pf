import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataApiService } from '../../services/data-api.service';

@Component({
  selector: 'app-emojis',
  templateUrl: './emojis.component.html',
  styleUrls: ['./emojis.component.css']
})
export class EmojisComponent implements OnInit {

  emojis = [];
  id: number;
  mensaje: string;

  constructor(
    private router: Router,
    private dataApiService: DataApiService
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.dataApiService.getEmojis().then(
      (emojis) => {
        this.emojis = emojis;
        console.log(this.emojis);
      }
    );
  }

  editar(id: number) {
    this.router.navigate(['editar-emoji', { id }]);
  }

  setearId(id: number) {
    this.id = id;
  }

  crear() {
    this.router.navigate(['editar-emoji']);
  }

  eliminar() {
    this.dataApiService.eliminarEmoji(this.id.toString()).then(
      (respuesta) => {
        this.recargar();
      }
    ).catch(
      (respuesta) => {
        this.mensaje = 'Error al eliminar el emoji.';
        document.getElementById('open-modal').click();
      }
    );
  }

  recargar() {
    window.location.reload();
  }

}
