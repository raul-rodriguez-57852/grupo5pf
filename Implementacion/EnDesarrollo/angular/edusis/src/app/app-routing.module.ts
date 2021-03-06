import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/registro/registro.component';
import { EditarEmojiComponent } from './components/editar-emoji/editar-emoji.component';
import { EmojisComponent } from './components/emojis/emojis.component';
import { EditarAlumnoComponent } from './components/editar-alumno/editar-alumno.component';
import { PerfilesComponent } from './components/perfiles/perfiles.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { EditarCursoComponent } from './components/editar-curso/editar-curso.component';
import { CursoComponent } from './components/curso/curso.component';
import { EditarAsignaturaComponent } from './components/editar-asignatura/editar-asignatura.component';
import { EditarTareaComponent } from './components/editar-tarea/editar-tarea.component';
import { EditarDetalleMultimediaComponent } from './components/editar-detalle-multimedia/editar-detalle-multimedia.component';
import { HomeAlumnoComponent } from './components/home-alumno/home-alumno.component';
import { LoginComponent } from './components/login/login.component';
import { CrearActividadComponent } from './components/crear-actividad/crear-actividad.component';
import { VistaPreviaActividadComponent } from './components/vista-previa-actividad/vista-previa-actividad.component';
import { EditarDetalleActividadComponent } from './components/editar-detalle-actividad/editar-detalle-actividad.component';
import { VistaPreviaPasapalabraComponent } from './components/vista-previa-pasapalabra/vista-previa-pasapalabra.component';
import { CrearActividadPasapalabraComponent } from './components/crear-actividad-pasapalabra/crear-actividad-pasapalabra.component';
import { CursoAlumnoComponent } from './components/curso-alumno/curso-alumno.component';
import { RealizacionTareaComponent } from './components/realizacion-tarea/realizacion-tarea.component';
import { RealizacionPreguntasComponent } from './components/realizacion-preguntas/realizacion-preguntas.component';
import { RealizacionPasapalabrasComponent } from './components/realizacion-pasapalabras/realizacion-pasapalabras.component';
import { HomeProfesorComponent } from './components/home-profesor/home-profesor.component';

const routes: Routes = [
  // TODO: DEFINIR AUTH
  { path: 'home', component: HomeComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'cursos', component: CursosComponent },
  { path: 'editar-curso', component: EditarCursoComponent },
  { path: 'curso', component: CursoComponent },
  { path: 'editar-asignatura', component: EditarAsignaturaComponent },
  { path: 'crear-actividad', component: CrearActividadComponent },
  {
    path: 'crear-actividad-pasapalabra',
    component: CrearActividadPasapalabraComponent,
  },
  { path: 'vista-previa-actividad', component: VistaPreviaActividadComponent },
  {
    path: 'vista-previa-pasapalabra',
    component: VistaPreviaPasapalabraComponent,
  },
  { path: 'inicio-sesion', component: InicioSesionComponent },
  { path: 'editar-emoji', component: EditarEmojiComponent },
  { path: 'emojis', component: EmojisComponent },
  { path: 'editar-alumno', component: EditarAlumnoComponent },
  { path: 'editar-tarea', component: EditarTareaComponent },
  {
    path: 'editar-detalle-multimedia',
    component: EditarDetalleMultimediaComponent,
  },
  {
    path: 'editar-detalle-actividad',
    component: EditarDetalleActividadComponent,
  },
  { path: 'perfiles', component: PerfilesComponent },
  { path: 'home-profesor', component: HomeProfesorComponent },
  { path: 'home-alumno', component: HomeAlumnoComponent },
  { path: 'curso-alumno', component: CursoAlumnoComponent },
  { path: 'realizacion-tarea', component: RealizacionTareaComponent },
  { path: 'realizacion-preguntas', component: RealizacionPreguntasComponent },
  {
    path: 'realizacion-pasapalabras',
    component: RealizacionPasapalabrasComponent,
  },
  { path: '', component: LoginComponent },
];

@NgModule({
  // este cambio es para que recargue la página si recibe la misma
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
