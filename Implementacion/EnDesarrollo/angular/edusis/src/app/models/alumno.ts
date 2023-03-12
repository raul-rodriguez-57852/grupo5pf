import { Addon } from './addon';
import { PasswordEmoji } from './password-emoji';
import { Recompensa } from './recompensa';
export class Alumno {
  id: number;
  nombre: string;
  apellido: string;
  documento: string;
  tipoDocumento: string;
  fechaNacimiento: Date;
  avatarUrl: string;
  passwordEmoji: PasswordEmoji;
  tutorId: number;
  saldoEstrellas: number;
  recompensas: Recompensa[];
  listRecompensasComprada: any[];
  listRecompensasEquipada: any[];
  mapRecompensas: Map<Addon, Boolean>;
  isActive: boolean;
}
