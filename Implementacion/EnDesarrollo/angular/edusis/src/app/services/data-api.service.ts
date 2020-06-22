import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emoji } from '../models/emoji';
import { Profesor } from '../models/profesor';
import { Tutor } from '../models/tutor';

@Injectable({
  providedIn: 'root',
})
export class DataApiService {
  urlBase: string;

  constructor(private http: HttpClient) {
    this.urlBase = 'http://192.168.0.56:8090/api/';
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
}
