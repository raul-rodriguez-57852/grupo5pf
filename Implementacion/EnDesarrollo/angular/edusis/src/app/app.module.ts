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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistroComponent,
    NavbarComponent,
    EditarEmojiComponent,
    EmojisComponent,
    EditarAlumnoComponent,
    PerfilesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
