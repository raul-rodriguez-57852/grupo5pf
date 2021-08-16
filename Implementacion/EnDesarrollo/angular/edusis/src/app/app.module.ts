import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { RegistroComponent } from "./components/registro/registro.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { EditarEmojiComponent } from "./components/editar-emoji/editar-emoji.component";
import { EmojisComponent } from "./components/emojis/emojis.component";
import { EditarAlumnoComponent } from "./components/editar-alumno/editar-alumno.component";
import { PerfilesComponent } from "./components/perfiles/perfiles.component";
import { InicioSesionComponent } from "./components/inicio-sesion/inicio-sesion.component";
import { CursosComponent } from "./components/cursos/cursos.component";
import { CursoComponent } from "./components/curso/curso.component";
import { EditarCursoComponent } from "./components/editar-curso/editar-curso.component";
import { EditarAsignaturaComponent } from "./components/editar-asignatura/editar-asignatura.component";
import { EditarTareaComponent } from "./components/editar-tarea/editar-tarea.component";
import { EditarDetalleMultimediaComponent } from "./components/editar-detalle-multimedia/editar-detalle-multimedia.component";
import { HomeAlumnoComponent } from "./components/home-alumno/home-alumno.component";
import { LoginComponent } from "./components/login/login.component";
import { CrearActividadComponent } from "./components/crear-actividad/crear-actividad.component";
import { VistaPreviaActividadComponent } from "./components/vista-previa-actividad/vista-previa-actividad.component";
import { EditarDetalleActividadComponent } from "./components/editar-detalle-actividad/editar-detalle-actividad.component";
import { VistaPreviaPasapalabraComponent } from "./components/vista-previa-pasapalabra/vista-previa-pasapalabra.component";
import { CrearActividadPasapalabraComponent } from "./components/crear-actividad-pasapalabra/crear-actividad-pasapalabra.component";
import { YouTubePlayerModule } from "@angular/youtube-player";
import { CursoAlumnoComponent } from './components/curso-alumno/curso-alumno.component';
import { RealizacionTareaComponent } from './components/realizacion-tarea/realizacion-tarea.component';
import { RealizacionPreguntasComponent } from './components/realizacion-preguntas/realizacion-preguntas.component';
import { RealizacionPasapalabrasComponent } from './components/realizacion-pasapalabras/realizacion-pasapalabras.component';
import { HomeProfesorComponent } from './components/home-profesor/home-profesor.component';
import { CallbackPipe } from "./callBackPipe";
import { ConfiguracionTutorComponent } from "./components/configuracion-tutor/configuracion-tutor.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { InterceptorService } from "./services/interceptor.service";
import { EstadisticasProfesorComponent } from './components/estadisticas-profesor/estadisticas-profesor.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistroComponent,
    NavbarComponent,
    EditarEmojiComponent,
    EmojisComponent,
    EditarAlumnoComponent,
    PerfilesComponent,
    InicioSesionComponent,
    CursosComponent,
    CursoComponent,
    EditarCursoComponent,
    EditarAsignaturaComponent,
    EditarTareaComponent,
    EditarDetalleMultimediaComponent,
    HomeAlumnoComponent,
    LoginComponent,
    CrearActividadComponent,
    VistaPreviaActividadComponent,
    EditarDetalleActividadComponent,
    VistaPreviaPasapalabraComponent,
    CrearActividadPasapalabraComponent,
    CursoAlumnoComponent,
    RealizacionTareaComponent,
    RealizacionPreguntasComponent,
    RealizacionPasapalabrasComponent,
    HomeProfesorComponent,
    CallbackPipe,
    ConfiguracionTutorComponent,
    EstadisticasProfesorComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    YouTubePlayerModule,
    NgbModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
