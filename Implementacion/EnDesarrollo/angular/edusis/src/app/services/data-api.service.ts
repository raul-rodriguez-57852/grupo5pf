import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emoji } from '../models/emoji';
import { Profesor } from '../models/profesor';
import { Tutor } from '../models/tutor';
import { Alumno } from '../models/alumno';
import { PasswordEmoji } from '../models/password-emoji';

@Injectable({
  providedIn: 'root',
})
export class DataApiService {
    urlBase: string;

  constructor(private http: HttpClient) {
    this.urlBase = 'http://localhost:8090/api/';
  }

  getEmojis(): Promise<any> {
    return this.http.get(this.urlBase + 'emojis').toPromise();
  }

  getEmoji(id: string): Promise<any> {
    return this.http
      .get(this.urlBase + 'emoji', { params: { id } })
      .toPromise();
  }

  eliminarEmoji(id: string): Promise<any> {
    return this.http
      .delete(this.urlBase + 'eliminarEmoji', { params: { id } })
      .toPromise();
  }

  guardarEmoji(emoji: Emoji): Promise<any> {
    return this.http.post(this.urlBase + 'guardarEmoji', emoji).toPromise();
  }

  guardarProfesor(profesor: Profesor): Promise<any> {
    return this.http
      .post(this.urlBase + 'guardarProfesor', profesor)
      .toPromise();
  }

  guardarTutor(tutor: Tutor): Promise<any> {
    return this.http.post(this.urlBase + 'guardarTutor', tutor).toPromise();
  }

  getTiposDoc(): Promise<any> {
    return this.http.get(this.urlBase + 'tiposDoc').toPromise();
  }

  guardarAlumno(alumno: Alumno): Promise<any> {
    return this.http.post(this.urlBase + 'guardarAlumno', alumno).toPromise();
  }

  getAlumnos(): Promise<any> {
    return this.http.get(this.urlBase + 'alumnos').toPromise();
  }

  ingresoAlumno(id: string, password: PasswordEmoji): Promise<any> {
    const postData = new FormData();
    postData.append('id' , id);
    postData.append('emoji1Id' , password.emoji1Id.toString());
    postData.append('emoji2Id' , password.emoji2Id.toString());
    postData.append('emoji3Id' , password.emoji3Id.toString());
    return this.http.post(this.urlBase + 'ingresoAlumno', postData).toPromise();
  }
}
