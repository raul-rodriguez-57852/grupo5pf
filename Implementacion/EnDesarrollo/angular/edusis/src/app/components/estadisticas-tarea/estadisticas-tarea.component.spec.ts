import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasTareaComponent } from './estadisticas-tarea.component';

describe('EstadisticasTareaComponent', () => {
  let component: EstadisticasTareaComponent;
  let fixture: ComponentFixture<EstadisticasTareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticasTareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
