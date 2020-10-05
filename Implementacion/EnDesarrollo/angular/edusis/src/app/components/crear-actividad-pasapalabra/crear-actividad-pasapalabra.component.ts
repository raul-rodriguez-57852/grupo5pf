import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataApiService } from '../../services/data-api.service';
import { NgForm } from '@angular/forms';
import { PreguntaPasapalabra } from '../../models/pregunta-pasapalabra';
import { PlantillaPasapalabra } from '../../models/plantilla-pasapalabra';

@Component({
  selector: 'app-crear-actividad-pasapalabra',
  templateUrl: './crear-actividad-pasapalabra.component.html',
  styleUrls: ['./crear-actividad-pasapalabra.component.css']
})
export class CrearActividadPasapalabraComponent implements OnInit {

  paso = 1;
  segundos = 300;
  nombre = null;
  preguntas: PreguntaPasapalabra[];
  plantilla: PlantillaPasapalabra;

  constructor(
    private dataApiService: DataApiService,
    private router: Router) { }

  ngOnInit() {
    this.plantilla = new PlantillaPasapalabra();
  }

  next(formActividad: NgForm) {
    this.paso = 2;
    this.plantilla.nombre = this.nombre;
    this.plantilla.segundos = this.segundos;
    this.plantilla.preguntasPasapalabraDto = [];
    this.preguntas = [];

    const preguntaA = new PreguntaPasapalabra();
    preguntaA.letra = 'A';
    preguntaA.pregunta = '';
    preguntaA.respuestaCorrecta = '';
    preguntaA.empiezaCon = true;
    this.preguntas.push(preguntaA);

    const preguntaB = new PreguntaPasapalabra();
    preguntaB.letra = 'B';
    preguntaB.pregunta = '';
    preguntaB.respuestaCorrecta = '';
    preguntaB.empiezaCon = true;
    this.preguntas.push(preguntaB);

    const preguntaC = new PreguntaPasapalabra();
    preguntaC.letra = 'C';
    preguntaC.pregunta = '';
    preguntaC.respuestaCorrecta = '';
    preguntaC.empiezaCon = true;
    this.preguntas.push(preguntaC);

    const preguntaD = new PreguntaPasapalabra();
    preguntaD.letra = 'D';
    preguntaD.pregunta = '';
    preguntaD.respuestaCorrecta = '';
    preguntaD.empiezaCon = true;
    this.preguntas.push(preguntaD);

    const preguntaE = new PreguntaPasapalabra();
    preguntaE.letra = 'E';
    preguntaE.pregunta = '';
    preguntaE.respuestaCorrecta = '';
    preguntaE.empiezaCon = true;
    this.preguntas.push(preguntaE);

    const preguntaF = new PreguntaPasapalabra();
    preguntaF.letra = 'F';
    preguntaF.pregunta = '';
    preguntaF.respuestaCorrecta = '';
    preguntaF.empiezaCon = true;
    this.preguntas.push(preguntaF);

    const preguntaG = new PreguntaPasapalabra();
    preguntaG.letra = 'G';
    preguntaG.pregunta = '';
    preguntaG.respuestaCorrecta = '';
    preguntaG.empiezaCon = true;
    this.preguntas.push(preguntaG);

    const preguntaH = new PreguntaPasapalabra();
    preguntaH.letra = 'H';
    preguntaH.pregunta = '';
    preguntaH.respuestaCorrecta = '';
    preguntaH.empiezaCon = true;
    this.preguntas.push(preguntaH);

    const preguntaI = new PreguntaPasapalabra();
    preguntaI.letra = 'I';
    preguntaI.pregunta = '';
    preguntaI.respuestaCorrecta = '';
    preguntaI.empiezaCon = true;
    this.preguntas.push(preguntaI);

    const preguntaJ = new PreguntaPasapalabra();
    preguntaJ.letra = 'J';
    preguntaJ.pregunta = '';
    preguntaJ.respuestaCorrecta = '';
    preguntaJ.empiezaCon = true;
    this.preguntas.push(preguntaJ);

    const preguntaL = new PreguntaPasapalabra();
    preguntaL.letra = 'L';
    preguntaL.pregunta = '';
    preguntaL.respuestaCorrecta = '';
    preguntaL.empiezaCon = true;
    this.preguntas.push(preguntaL);

    const preguntaM = new PreguntaPasapalabra();
    preguntaM.letra = 'M';
    preguntaM.pregunta = '';
    preguntaM.respuestaCorrecta = '';
    preguntaM.empiezaCon = true;
    this.preguntas.push(preguntaM);

    const preguntaN = new PreguntaPasapalabra();
    preguntaN.letra = 'N';
    preguntaN.pregunta = '';
    preguntaN.respuestaCorrecta = '';
    preguntaN.empiezaCon = true;
    this.preguntas.push(preguntaN);

    const preguntaEnie = new PreguntaPasapalabra();
    preguntaEnie.letra = 'Ñ';
    preguntaEnie.pregunta = '';
    preguntaEnie.respuestaCorrecta = '';
    preguntaEnie.empiezaCon = true;
    this.preguntas.push(preguntaEnie);

    const preguntaO = new PreguntaPasapalabra();
    preguntaO.letra = 'O';
    preguntaO.pregunta = '';
    preguntaO.respuestaCorrecta = '';
    preguntaO.empiezaCon = true;
    this.preguntas.push(preguntaO);

    const preguntaP = new PreguntaPasapalabra();
    preguntaP.letra = 'P';
    preguntaP.pregunta = '';
    preguntaP.respuestaCorrecta = '';
    preguntaP.empiezaCon = true;
    this.preguntas.push(preguntaP);

    const preguntaQ = new PreguntaPasapalabra();
    preguntaQ.letra = 'Q';
    preguntaQ.pregunta = '';
    preguntaQ.respuestaCorrecta = '';
    preguntaQ.empiezaCon = true;
    this.preguntas.push(preguntaQ);

    const preguntaR = new PreguntaPasapalabra();
    preguntaR.letra = 'R';
    preguntaR.pregunta = '';
    preguntaR.respuestaCorrecta = '';
    preguntaR.empiezaCon = true;
    this.preguntas.push(preguntaR);

    const preguntaS = new PreguntaPasapalabra();
    preguntaS.letra = 'S';
    preguntaS.pregunta = '';
    preguntaS.respuestaCorrecta = '';
    preguntaS.empiezaCon = true;
    this.preguntas.push(preguntaS);

    const preguntaT = new PreguntaPasapalabra();
    preguntaT.letra = 'T';
    preguntaT.pregunta = '';
    preguntaT.respuestaCorrecta = '';
    preguntaT.empiezaCon = true;
    this.preguntas.push(preguntaT);

    const preguntaU = new PreguntaPasapalabra();
    preguntaU.letra = 'U';
    preguntaU.pregunta = '';
    preguntaU.respuestaCorrecta = '';
    preguntaU.empiezaCon = true;
    this.preguntas.push(preguntaU);

    const preguntaV = new PreguntaPasapalabra();
    preguntaV.letra = 'V';
    preguntaV.pregunta = '';
    preguntaV.respuestaCorrecta = '';
    preguntaV.empiezaCon = true;
    this.preguntas.push(preguntaV);

    const preguntaX = new PreguntaPasapalabra();
    preguntaX.letra = 'X';
    preguntaX.pregunta = '';
    preguntaX.respuestaCorrecta = '';
    preguntaX.empiezaCon = true;
    this.preguntas.push(preguntaX);

    const preguntaY = new PreguntaPasapalabra();
    preguntaY.letra = 'Y';
    preguntaY.pregunta = '';
    preguntaY.respuestaCorrecta = '';
    preguntaY.empiezaCon = true;
    this.preguntas.push(preguntaY);

    const preguntaZ = new PreguntaPasapalabra();
    preguntaZ.letra = 'Z';
    preguntaZ.pregunta = '';
    preguntaZ.respuestaCorrecta = '';
    preguntaZ.empiezaCon = true;
    this.preguntas.push(preguntaZ);

    console.log(this.preguntas);

  }

  save() {
    console.log(this.preguntas);
    this.plantilla.preguntasPasapalabraDto = this.preguntas;
    this.dataApiService.crearActividadPasapalabra(this.plantilla).then(res => {
      console.log(res);
    });
  }

}
