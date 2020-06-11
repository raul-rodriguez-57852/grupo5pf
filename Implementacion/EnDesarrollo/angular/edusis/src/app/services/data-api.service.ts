import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emoji } from '../models/emoji';
import { Profesor } from '../models/profesor';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  urlBase: string;

  constructor(
    private http: HttpClient
  ) { this.urlBase = 'http://192.168.0.239:8090/api/'; }

  getEmojis(): Promise<any> {
    return this.http.get(this.urlBase + 'emojis').toPromise();
  }

  getEmoji(id: string): Promise<any> {
    return this.http.get(this.urlBase + 'emoji', { params: {id} }).toPromise();
  }

  eliminarEmoji(id: string): Promise<any> {
    return this.http.delete(this.urlBase + 'eliminarEmoji', { params: {id} }).toPromise();
  }

  guardarEmoji(emoji: Emoji): Promise<any> {
    return this.http.post(this.urlBase + 'guardarEmoji', emoji).toPromise();
  }

  guardarProfesor(profesor: Profesor): Promise<any> {
    return this.http.post(this.urlBase + 'guardarProfesor', profesor).toPromise();
  }
}
