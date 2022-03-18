import { CeldaGrilla } from './celda-grilla';
export class PlantillaGrilla {
  nombre: string;
  imagen: string;
  cantidadFilas: number;
  cantidadColumnas: number;
  celdasDto: CeldaGrilla[];
  creadorId: number;
}
