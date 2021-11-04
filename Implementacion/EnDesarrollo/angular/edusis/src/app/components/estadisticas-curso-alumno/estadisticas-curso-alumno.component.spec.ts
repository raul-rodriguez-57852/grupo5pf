import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasCursoAlumnoComponent } from './estadisticas-curso-alumno.component';

describe('EstadisticasCursoAlumnoComponent', () => {
  let component: EstadisticasCursoAlumnoComponent;
  let fixture: ComponentFixture<EstadisticasCursoAlumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticasCursoAlumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasCursoAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
