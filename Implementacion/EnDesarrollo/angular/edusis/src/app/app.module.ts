import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { RegistroComponent } from "./components/registro/registro.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
import { RealizacionPasapalabraComponent } from './components/realizacion-pasapalabra/realizacion-pasapalabra.component';
import { HomeProfesorComponent } from './components/home-profesor/home-profesor.component';
import { CallbackPipe } from "./callBackPipe";
import { ConfiguracionTutorComponent } from "./components/configuracion-tutor/configuracion-tutor.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { InterceptorService } from "./services/interceptor.service";
import { EstadisticasProfesorComponent } from './components/estadisticas-profesor/estadisticas-profesor.component';
import { EstadisticasTareaComponent } from './components/estadisticas-tarea/estadisticas-tarea.component';
import { PipeList } from "./filterPipe";
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { EstadisticasCursoAlumnoComponent } from './components/estadisticas-curso-alumno/estadisticas-curso-alumno.component';
import { CrearActividadGrillaComponent } from './components/crear-actividad-grilla/crear-actividad-grilla.component';
import { VistaPreviaGrillaComponent } from './components/vista-previa-grilla/vista-previa-grilla.component';
import { RealizacionGrillaComponent } from './components/realizacion-grilla/realizacion-grilla.component';
import { RecompensasComponent } from "./components/recompensas/recompensas.component";
import { CrearActividadCategoriasComponent } from './components/crear-actividad-categorias/crear-actividad-categorias.component';
import { VistaPreviaCategoriasComponent } from './components/vista-previa-categorias/vista-previa-categorias.component';
import { NgDragDropModule } from "ng-drag-drop";
import { RealizacionCategoriasComponent } from './components/realizacion-categorias/realizacion-categorias.component';
import { CrearActividadVfComponent } from './components/crear-actividad-vf/crear-actividad-vf.component';
import { VistaPreviaVfComponent } from './components/vista-previa-vf/vista-previa-vf.component';
import { RealizacionVfComponent } from './components/realizacion-vf/realizacion-vf.component';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


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
    RealizacionPasapalabraComponent,
    HomeProfesorComponent,
    CallbackPipe,
    ConfiguracionTutorComponent,
    EstadisticasProfesorComponent,
    EstadisticasTareaComponent,
    EstadisticasCursoAlumnoComponent,
    CrearActividadGrillaComponent,
    VistaPreviaGrillaComponent,
    RealizacionGrillaComponent,
    EstadisticasCursoAlumnoComponent,
    RecompensasComponent,
    PipeList,
    CrearActividadCategoriasComponent,
    VistaPreviaCategoriasComponent,
    RealizacionCategoriasComponent,
    CrearActividadVfComponent,
    VistaPreviaVfComponent,
    RealizacionVfComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    YouTubePlayerModule,
    NgbModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    NgDragDropModule.forRoot(),
    CommonModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
