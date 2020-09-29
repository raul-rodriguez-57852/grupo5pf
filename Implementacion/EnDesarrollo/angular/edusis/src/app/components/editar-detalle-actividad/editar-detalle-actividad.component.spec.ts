import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDetalleActividadComponent } from './editar-detalle-actividad.component';

describe('EditarDetalleActividadComponent', () => {
  let component: EditarDetalleActividadComponent;
  let fixture: ComponentFixture<EditarDetalleActividadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarDetalleActividadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDetalleActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
