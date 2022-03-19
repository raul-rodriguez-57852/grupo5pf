import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataApiService } from 'src/app/services/data-api.service';
import { DataTareaService } from 'src/app/services/data-tarea.service';
import { ChartsModule, WavesModule } from 'angular-bootstrap-md';
import { PipeList } from 'src/app/filterPipe';

@Component({
  selector: 'app-estadisticas-tarea',
  templateUrl: './estadisticas-tarea.component.html',
  styleUrls: ['./estadisticas-tarea.component.css']
})
export class EstadisticasTareaComponent implements OnInit {

  tareaId: number;
  cursoId: number;
  searchText: string;

  alumnos = [];

  alumnosFiltrados = [];

  page = 1;
  pageSize = 10;
  collectionSize: number;

  estadisticasSelected = false;

  public chartDatasets = [{ data: [], label: "" }];
  public chartLabels: Array<any> = ['No realizada', '0 - 20', '20 -40', '40 - 60', '60 - 80', '80 - 100'];
  public chartOptions: any = {
    responsive: true
  }

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(75, 192, 192, 0.2)'

      ],
      borderColor: [
        'rgba(153, 102, 255, 1)',
        'rgba(255,99,132,1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)'

      ],
      borderWidth: 2,
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataApiService: DataApiService,
    private dataTareaService: DataTareaService
  ) { }

  ngOnInit(): void {

    this.tareaId =
      this.route.snapshot.paramMap.get("tareaId") != null
        ? Number(this.route.snapshot.paramMap.get("tareaId"))
        : null;
    this.cursoId =
      this.route.snapshot.paramMap.get("cursoId") != null
        ? Number(this.route.snapshot.paramMap.get("cursoId"))
        : null;

    this.getAll();
  }

  async getAll() {
    await this.dataTareaService.getRealizacionesPorAlumno(this.tareaId).then(
      (alumnos) => {
        this.alumnos = alumnos;

      }
    );

    this.alumnosFiltrados = this.alumnos;
    this.collectionSize = this.alumnos.length;

    console.log(this.alumnos);
  }

  volverATareas() {

    this.router.navigate(["estadisticas-profesor", { cursoId: this.cursoId }]);
  }

  irAEstadisticas() {
    this.dataTareaService.getCantidadPorRangoTarea(this.tareaId).then(
      (rangos) => {
        this.chartDatasets = [
          { data: [rangos["No realizada"], rangos["0-20"], rangos["20-40"], rangos["40-60"], rangos["60-80"], rangos["80-100"]], label: "Cantidad de alumnos por puntaje" },
        ];
      }

    );
    this.estadisticasSelected = true;
  }

  volverALista() {
    this.estadisticasSelected = false;
  }


}
