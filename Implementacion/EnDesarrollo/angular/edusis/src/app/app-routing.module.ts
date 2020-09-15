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

const routes: Routes = [
  // TODO: DEFINIR AUTH
  { path: '', component: HomeComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'cursos', component: CursosComponent },
  { path: 'editar-curso', component: EditarCursoComponent },
  { path: 'curso', component: CursoComponent },
  { path: 'editar-asignatura', component: EditarAsignaturaComponent },
  { path: 'inicio-sesion', component: InicioSesionComponent },
  { path: 'editar-emoji', component: EditarEmojiComponent },
  { path: 'emojis', component: EmojisComponent },
  { path: 'editar-alumno', component: EditarAlumnoComponent },
  { path: 'editar-tarea', component: EditarTareaComponent },
  {path: 'editar-detalle-multimedia', component: EditarDetalleMultimediaComponent},
  { path: 'perfiles', component: PerfilesComponent },
  { path: 'home-alumno', component: HomeAlumnoComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
