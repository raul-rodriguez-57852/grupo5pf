import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/registro/registro.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EditarEmojiComponent } from './components/editar-emoji/editar-emoji.component';
import { EmojisComponent } from './components/emojis/emojis.component';
import { EditarAlumnoComponent } from './components/editar-alumno/editar-alumno.component';
import { PerfilesComponent } from './components/perfiles/perfiles.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { CursoComponent } from './components/curso/curso.component';
import { EditarCursoComponent } from './components/editar-curso/editar-curso.component';
import { EditarAsignaturaComponent } from './components/editar-asignatura/editar-asignatura.component';
import { EditarTareaComponent } from './components/editar-tarea/editar-tarea.component';
import { EditarDetalleMultimediaComponent } from './components/editar-detalle-multimedia/editar-detalle-multimedia.component';
import { HomeAlumnoComponent } from './components/home-alumno/home-alumno.component';
import { LoginComponent } from './components/login/login.component';

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
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
