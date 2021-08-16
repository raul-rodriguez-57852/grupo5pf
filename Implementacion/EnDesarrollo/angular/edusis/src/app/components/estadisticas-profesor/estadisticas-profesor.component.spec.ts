import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasProfesorComponent } from './estadisticas-profesor.component';

describe('EstadisticasProfesorComponent', () => {
  let component: EstadisticasProfesorComponent;
  let fixture: ComponentFixture<EstadisticasProfesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EstadisticasProfesorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


