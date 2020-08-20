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
  { path: 'perfiles', component: PerfilesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
