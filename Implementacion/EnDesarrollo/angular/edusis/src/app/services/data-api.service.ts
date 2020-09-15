import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emoji } from '../models/emoji';
import { Profesor } from '../models/profesor';
import { Tutor } from '../models/tutor';
import { Alumno } from '../models/alumno';
import { PasswordEmoji } from '../models/password-emoji';
import { Curso } from '../models/curso';
import { Asignatura } from '../models/asignatura';

@Injectable({
  providedIn: 'root',
})
export class DataApiService {
  urlBase: string;
  urlTarea: string;
  usuario = null;

  constructor(private http: HttpClient) {
    this.urlBase = 'http://localhost:8090/api/';
  }

//#######     EMOJI      #########  

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

  //#######     PROFESOR      #########  

  guardarProfesor(profesor: Profesor): Promise<any> {
    return this.http
      .post(this.urlBase + 'guardarProfesor', profesor)
      .toPromise();
  }

  //#######     TUTOR      #########  
  getTutor(id: string): Promise<any> {
    return this.http
    .get(this.urlBase + 'tutor', {params: { id } })
    .toPromise();
  }

  guardarTutor(tutor: Tutor): Promise<any> {
    return this.http.post(this.urlBase + 'guardarTutor', tutor).toPromise();
  }

  //#######     DOCUMENTO      #########  

  getTiposDoc(): Promise<any> {
    return this.http.get(this.urlBase + 'tiposDoc').toPromise();
  }

//#######     ALUMNO      #########  
  guardarAlumno(alumno: Alumno): Promise<any> {
    return this.http.post(this.urlBase + 'guardarAlumno', alumno).toPromise();
  }

  getAlumnos(): Promise<any> {
    return this.http.get(this.urlBase + 'alumnos').toPromise();
  }

  getAlumno(id: string):Promise<any>{
    return this.http.get(this.urlBase + 'alumno', { params: { id } }).toPromise();
  }

  ingresoAlumno(id: string, password: PasswordEmoji): Promise<any> {
    const postData = new FormData();
    postData.append('id', id);
    postData.append('emoji1Id', password.emoji1Id.toString());
    postData.append('emoji2Id', password.emoji2Id.toString());
    postData.append('emoji3Id', password.emoji3Id.toString());
    return this.http.post(this.urlBase + 'ingresoAlumno', postData).toPromise();
  }

  getCursosDeAlumno(idAlumno: string): Promise<any>{
    return this.http.get(this.urlBase + 'getCursosDeAlumno', {params: { idAlumno } }).toPromise();
  }

    //#######     SESSION      ######### 

  inicioSesionFake(documento: string): Promise<any> {
    return this.http
      .get(this.urlBase + 'inicioSesionFake', { params: { documento } })
      .toPromise();
  }


  //#######     CURSO      #########  
  getCurso(id: string): Promise<any> {
    return this.http
      .get(this.urlBase + 'curso', { params: { id } })
      .toPromise();
  }

  getCursos(): Promise<any> {
    console.log('Entro en getCursos() en apicontroller')
    return this.http.get(this.urlBase + 'cursos').toPromise();
  }

  guardarCurso(curso: Curso): Promise<any> {
    return this.http.post(this.urlBase + 'guardarCurso', curso).toPromise();
  }

  generarCodigoCurso(curso: Curso): Promise<any> {
    return this.http
    .post(this.urlBase + 'generarCodigoCurso',curso).toPromise();
  }

  buscarCursoPorCodigo(codigo: string): Promise<any> {
    return this.http.get(this.urlBase + 'buscarCursoPorCodigo', {params: { codigo }}).toPromise();
  }

  agregarAlumnoACurso(idAlumno: string, idCurso: string): Promise<any> {
    const postData = new FormData();
    postData.append('idAlumno', idAlumno);
    postData.append('idCurso', idCurso)
    return this.http.post(this.urlBase + 'agregarAlumnoACurso', postData).toPromise();
  }

  //#######     ASIGNATURA      ######### 
  guardarAsignatura(asignatura: Asignatura): Promise<any> {
    return this.http
      .post(this.urlBase + 'guardarAsignatura', asignatura)
      .toPromise();
  }

  getAsignatura(id: string): Promise<any> {
    return this.http
      .get(this.urlBase + 'asignatura', { params: { id } })
      .toPromise();
  }

  getAsignaturas(cursoId: number): Promise<any> {
    return this.http
      .get(this.urlBase + 'asignaturas', {
        params: { cursoId: cursoId.toString() },
      })
      .toPromise();
  }

}
