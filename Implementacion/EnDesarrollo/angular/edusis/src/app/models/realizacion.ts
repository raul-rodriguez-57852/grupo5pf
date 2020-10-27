import { RealizacionDetalle } from './realizacion-detalle';
export class Realizacion {
    id: number;
    idTarea: number;
    idAlumno: number;
    detalles: RealizacionDetalle[];
    fecha: Date;
  }