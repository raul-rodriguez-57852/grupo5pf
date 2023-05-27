import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Tarea } from "../models/tarea";
import { DetalleMultimedia } from "../models/detalleMultimedia";
import { DetalleActividad } from "../models/detalleActividad";
import { Realizacion } from '../models/realizacion';

@Injectable({
  providedIn: "root",
})
export class DataTareaService {
  urlBase: string;
  usuario = null;

  constructor(private http: HttpClient) {
    this.urlBase = "http://192.168.0.100:8090/tarea/";
  }

  getTarea(id: string): Promise<any> {
    return this.http
      .get(this.urlBase + "tarea", { params: { id } })
      .toPromise();
  }

  guardarTarea(tarea: Tarea): Promise<any> {
    return this.http.post(this.urlBase + "guardarTarea", tarea).toPromise();
  }

  getTareas(cursoId: number): Promise<any> {
    return this.http
      .get(this.urlBase + "tareas", {
        params: { cursoId: cursoId.toString() },
      })
      .toPromise();
  }

  getRealizaciones(cursoId: number, alumnoId: number): Promise<any> {
    return this.http
      .get(this.urlBase + "realizaciones", {
        params: { cursoId: cursoId.toString(), alumnoId: alumnoId.toString() },
      })
      .toPromise();
  }

  getPorcentajeRealizacion(cursoId: number): Promise<any> {
    return this.http
      .get(this.urlBase + "porcentajeRealizacion", {
        params: { cursoId: cursoId.toString() },
      })
      .toPromise();
  }

  getRealizacionesPorAlumno(tareaId: number): Promise<any> {
    return this.http
      .get(this.urlBase + "realizacionesPorAlumno", {
        params: { tareaId: tareaId.toString() },
      })
      .toPromise();
  }

  getAlumnosPorCurso(cursoId: number): Promise<any> {
    return this.http
      .get(this.urlBase + "alumnosPorCurso", {
        params: { cursoId: cursoId.toString() },
      })
      .toPromise();
  }

  getCantidadPorRangoTarea(tareaId: number): Promise<any> {
    return this.http
      .get(this.urlBase + "cantidadPorRangoTarea", {
        params: { tareaId: tareaId.toString() },
      })
      .toPromise();
  }

  getPuntajeAlumnoAcumulado(cursoId: number, alumnoId: number, asignaturaId?: number): Promise<any> {
    if (asignaturaId != null) {
      return this.http
        .get(this.urlBase + "puntajeAlumnoAcumulado", {
          params: { cursoId: cursoId.toString(), alumnoId: alumnoId.toString(), asignaturaId: asignaturaId.toString() },
        })
        .toPromise();
    } else {
      return this.http
        .get(this.urlBase + "puntajeAlumnoAcumulado", {
          params: { cursoId: cursoId.toString(), alumnoId: alumnoId.toString() },
        })
        .toPromise();
    }

  }

  guardarDetalleMultimedia(detalle: DetalleMultimedia): Promise<any> {
    return this.http
      .post(this.urlBase + "guardarDetalleMultimedia", detalle)
      .toPromise();
  }

  guardarDetallesActividad(detalles: DetalleActividad[]): Promise<any> {
    return this.http
      .post(this.urlBase + "guardarDetallesActividad", detalles)
      .toPromise();
  }

  getDetalleMultimediaTarea(tareaId: number): Promise<any> {
    return this.http
      .get(this.urlBase + "detalleMultimediaTarea", {
        params: { tareaId: tareaId.toString() },
      })
      .toPromise();
  }

  getImagenDetalle(id: string): Promise<any> {
    return this.http
      .get(this.urlBase + 'imagenDetalle', { params: { id }, responseType: 'text' })
      .toPromise();
  }

  getDetalleActividadTarea(tareaId: number): Promise<any> {
    return this.http
      .get(this.urlBase + "detalleActividadTarea", {
        params: { tareaId: tareaId.toString() },
      })
      .toPromise();
  }

  getActividadTipo(actividadId: number): Promise<any> {
    return this.http
      .get(this.urlBase + "actividadTipo", {
        params: { actividadId: actividadId.toString() },
        responseType: "text",
      })
      .toPromise();
  }

  getDetalleActividadCreador(tareaId: number): Promise<any> {
    return this.http
      .get(this.urlBase + "detalleActividadCreador", {
        params: { tareaId: tareaId.toString() },
      })
      .toPromise();
  }

  guardarRealizacionTarea(realizacion: Realizacion): Promise<any> {
    return this.http
      .post(this.urlBase + "guardarRealizacionTarea", realizacion)
      .toPromise();
  }

  eliminarTarea(tareaId: string): Promise<any> {
    return this.http
      .get(this.urlBase + "eliminarTarea", {
        params: { tareaId: tareaId.toString() },
      })
      .toPromise();
  }

  getTareaByAsignatura(asignaturaId: number): Promise<any> {
    return this.http
      .get(this.urlBase + "getTareaByAsignatura", {
        params: { asignaturaId: asignaturaId.toString() },
      })
      .toPromise();
  }
}
