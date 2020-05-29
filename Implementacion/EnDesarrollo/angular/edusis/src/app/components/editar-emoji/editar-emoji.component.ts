import { Component, OnInit } from '@angular/core';
import { Emoji } from '../../models/emoji';
import { ActivatedRoute } from '@angular/router';
import { DataApiService } from '../../services/data-api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar-emoji',
  templateUrl: './editar-emoji.component.html',
  styleUrls: ['./editar-emoji.component.css']
})
export class EditarEmojiComponent implements OnInit {

  emoji: Emoji = { id: null, nombre: null, iconoURL: null };
  mensaje: string = null;

  constructor(
    private route: ActivatedRoute,
    private dataApiService: DataApiService
  ) { }

  ngOnInit() {
    this.emoji.id = this.route.snapshot.paramMap.get('id') != null ? Number(this.route.snapshot.paramMap.get('id')) : null;
    if (this.emoji.id != null) {
      this.dataApiService.getEmoji(this.emoji.id.toString()).then(
        (emoji) => {
          this.emoji.nombre = emoji.nombre;
          this.emoji.iconoURL = emoji.iconoURL;
        }
      );
    }
  }

  save(formEmoji: NgForm) {
    this.dataApiService.guardarEmoji(this.emoji).then(
      (respuesta) => {
        this.mensaje = 'Emoji guardado con éxito.';
        this.recargar();
      }
    ).catch(
      (respuesta) => {
        this.mensaje = 'Error al guardar.';
        document.getElementById('open-modal').click();
      }
    );
  }

  recargar() {
    window.location.reload();
  }

}
