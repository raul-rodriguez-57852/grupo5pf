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
import { RealizacionPasapalabraComponent } from './components/realizacion-pasapalabra/realizacion-pasapalabra.component';
import { HomeProfesorComponent } from './components/home-profesor/home-profesor.component';
import { EstadisticasProfesorComponent } from './components/estadisticas-profesor/estadisticas-profesor.component';
import { DocenteAuthGuard } from './guards/docente-auth.guard';
import { TutorAuthGuard } from './guards/tutor-auth.guard';
import { ConfiguracionTutorComponent } from './components/configuracion-tutor/configuracion-tutor.component';
import { EstadisticasTareaComponent } from './components/estadisticas-tarea/estadisticas-tarea.component';
import { EstadisticasCursoAlumnoComponent } from './components/estadisticas-curso-alumno/estadisticas-curso-alumno.component';
import { VistaPreviaGrillaComponent } from './components/vista-previa-grilla/vista-previa-grilla.component';
import { CrearActividadGrillaComponent } from './components/crear-actividad-grilla/crear-actividad-grilla.component';
import { RealizacionGrillaComponent } from './components/realizacion-grilla/realizacion-grilla.component';

const routes: Routes = [

  // Públicos
  { path: 'home', component: HomeComponent }, // Aparentemente ya no se utiliza
  { path: '', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'inicio-sesion', component: InicioSesionComponent }, // Aparentemente ya no se utiliza

  // Docentes
  { path: 'cursos', component: CursosComponent, canActivate: [DocenteAuthGuard] },
  { path: 'editar-curso', component: EditarCursoComponent, canActivate: [DocenteAuthGuard] },
  { path: 'curso', component: CursoComponent, canActivate: [DocenteAuthGuard] },
  { path: 'editar-asignatura', component: EditarAsignaturaComponent, canActivate: [DocenteAuthGuard] },
  { path: 'crear-actividad', component: CrearActividadComponent, canActivate: [DocenteAuthGuard] },
  { path: 'crear-actividad-pasapalabra', component: CrearActividadPasapalabraComponent, canActivate: [DocenteAuthGuard] },
  { path: 'crear-actividad-grilla', component: CrearActividadGrillaComponent, canActivate: [DocenteAuthGuard] },
  { path: 'vista-previa-actividad', component: VistaPreviaActividadComponent, canActivate: [DocenteAuthGuard] },
  { path: 'vista-previa-grilla', component: VistaPreviaGrillaComponent, canActivate: [DocenteAuthGuard] },
  { path: 'vista-previa-pasapalabra', component: VistaPreviaPasapalabraComponent, canActivate: [DocenteAuthGuard] },
  { path: 'editar-tarea', component: EditarTareaComponent, canActivate: [DocenteAuthGuard] },
  { path: 'editar-detalle-multimedia', component: EditarDetalleMultimediaComponent, canActivate: [DocenteAuthGuard] },
  { path: 'editar-detalle-actividad', component: EditarDetalleActividadComponent, canActivate: [DocenteAuthGuard] },
  { path: 'home-profesor', component: HomeProfesorComponent, canActivate: [DocenteAuthGuard] },
  { path: 'estadisticas-profesor', component: EstadisticasProfesorComponent, canActivate: [DocenteAuthGuard] },
  { path: 'estadisticas-tarea', component: EstadisticasTareaComponent, canActivate: [DocenteAuthGuard] },
  { path: 'estadisticas-curso-alumno', component: EstadisticasCursoAlumnoComponent, canActivate: [DocenteAuthGuard] },

  // Por ahora docentes, luego admin...
  { path: 'editar-emoji', component: EditarEmojiComponent, canActivate: [DocenteAuthGuard] },
  { path: 'emojis', component: EmojisComponent, canActivate: [DocenteAuthGuard] },

  // Tutores (luego habría que hacer una diferenciación con alumno, por ahora iguales)
  { path: 'editar-alumno', component: EditarAlumnoComponent, canActivate: [TutorAuthGuard] },
  { path: 'perfiles', component: PerfilesComponent, canActivate: [TutorAuthGuard] },
  { path: 'home-alumno', component: HomeAlumnoComponent, canActivate: [TutorAuthGuard] },
  { path: 'curso-alumno', component: CursoAlumnoComponent, canActivate: [TutorAuthGuard] },
  { path: 'realizacion-tarea', component: RealizacionTareaComponent, canActivate: [TutorAuthGuard] },
  { path: 'realizacion-preguntas', component: RealizacionPreguntasComponent, canActivate: [TutorAuthGuard] },
  { path: 'configuracion-tutor', component: ConfiguracionTutorComponent, canActivate: [TutorAuthGuard] },
  { path: 'realizacion-pasapalabra', component: RealizacionPasapalabraComponent, canActivate: [TutorAuthGuard] },
  { path: 'realizacion-grilla', component: RealizacionGrillaComponent, canActivate: [TutorAuthGuard] },
  { path: 'configuracion-tutor', component: ConfiguracionTutorComponent, canActivate: [TutorAuthGuard]},

];

@NgModule({
  // este cambio es para que recargue la página si recibe la misma
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
