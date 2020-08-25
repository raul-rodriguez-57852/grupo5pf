import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emoji } from '../models/emoji';
import { Profesor } from '../models/profesor';
import { Tutor } from '../models/tutor';
import { Alumno } from '../models/alumno';
import { PasswordEmoji } from '../models/password-emoji';
import { Curso } from '../models/curso';
import { Asignatura } from '../models/asignatura';
import { Tarea } from '../models/tarea';
import { DetalleMultimedia } from '../models/detalleMultimedia';

@Injectable({
  providedIn: 'root',
})
export class DataTareaService {
  urlBase: string;
  usuario = null;

  constructor(private http: HttpClient) {
    this.urlBase = 'http://localhost:8090/tarea/';
  }

  getTarea(id: string): Promise<any> {
    return this.http
      .get(this.urlBase + 'tarea', { params: { id } })
      .toPromise();
  }

  guardarTarea(tarea: Tarea): Promise<any> {
    return this.http.post(this.urlBase + 'guardarTarea', tarea).toPromise();
  }

  getTareas(cursoId: number): Promise<any> {
    return this.http
      .get(this.urlBase + 'tareas', {
        params: { cursoId: cursoId.toString() },
      })
      .toPromise();
  }

  guardarDetalleMultimedia(detalle: DetalleMultimedia): Promise<any> {
    return this.http
      .post(this.urlBase + 'guardarDetalleMultimedia', detalle)
      .toPromise();
  }
}
