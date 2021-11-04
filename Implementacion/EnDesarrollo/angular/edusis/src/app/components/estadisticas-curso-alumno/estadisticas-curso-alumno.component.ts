import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataApiService } from 'src/app/services/data-api.service';
import { DataTareaService } from 'src/app/services/data-tarea.service';

@Component({
  selector: 'app-estadisticas-curso-alumno',
  templateUrl: './estadisticas-curso-alumno.component.html',
  styleUrls: ['./estadisticas-curso-alumno.component.css']
})
export class EstadisticasCursoAlumnoComponent implements OnInit {

  nombreCurso = null;
  urlImagenCurso = null;
  cursoId = null;
  asignaturas = [];
  asignaturaSelected = null;
  tuplaPuntaje = [];

  alumnos = [];

  alumnosFiltrados = [];
  searchText: string;

  page = 1;
  pageSize = 10;
  collectionSize: number;

  id_profesor = null;

  alumnoSelected = false;

  public chartDatasets = [{ data: [], label: "" }];
  public chartLabels: Array<any> = [];
  public chartOptions: any = {
    responsive: true,
    legend: {
      display: false,
      labels: {
        fontColor: 'rgb(255, 99, 132)'
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          suggestedMin: 0,
          suggestedMax: 100,

        }
      }],
      xAxes: [{
        ticks: {
          fontSize: 10
        }
      }]

    }
  }



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataApiService: DataApiService,
    private dataTareaService: DataTareaService
  ) { }

  async ngOnInit() {
    this.id_profesor = this.dataApiService.getUsuario()

    if (this.route.snapshot.paramMap.get("cursoId") != null) {
      this.selectCurso(Number(this.route.snapshot.paramMap.get("cursoId")));
    }
  }

  selectCurso(id: number) {
    this.cursoId = id;

    this.dataApiService.getCurso(this.cursoId).then((res) => {
      this.nombreCurso = res.nombre;
      this.urlImagenCurso = res.iconoURL;
    });

    this.dataApiService.getAsignaturasByCreador(this.cursoId, this.id_profesor).then((asignaturas) => {
      this.asignaturas = asignaturas;

    });

    this.dataTareaService.getAlumnosPorCurso(this.cursoId).then(
      (alumnos) => {
        this.alumnos = alumnos;
        this.alumnosFiltrados = this.alumnos;
        this.collectionSize = this.alumnos.length;

      }
    );

  }

  selectAlumno(id: number) {
    this.alumnoSelected = true;

    let asignaturaId = null;
    if (this.asignaturaSelected != null) {
      asignaturaId = this.asignaturaSelected.id;
    }

    this.dataTareaService.getPuntajeAlumnoAcumulado(this.cursoId, id, asignaturaId).then(
      (puntajes) => {
        this.tuplaPuntaje = puntajes;
        puntajes.sort(function (a, b) { return (a["fecha"] > b["fecha"]) ? 1 : ((b["fecha"] > a["fecha"]) ? -1 : 0); });
        let puntos = [];
        let fechas = [];
        puntajes.forEach(element => {
          puntos.push(element["puntajeMaximo"]);
          if (element["fecha"] != null) {
            var date = new Date(element["fecha"]);

            element["fecha"] = date.toLocaleDateString();
          } else {
            element["fecha"] = "";
          }
          let label = element["nombre"];
          fechas.push(label);
        });

        this.chartDatasets = [
          { data: puntos, label: "Cantidad de puntos por tarea" },
        ];
        this.chartLabels = fechas;

      }
    );



  }

  volverATareas() {

    this.router.navigate(["estadisticas-profesor", { cursoId: this.cursoId }]);
  }

  volverALista() {
    this.alumnoSelected = false;
  }





}
