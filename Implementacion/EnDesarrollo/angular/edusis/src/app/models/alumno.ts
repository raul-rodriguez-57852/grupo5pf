import { PasswordEmoji } from './password-emoji';
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
}
