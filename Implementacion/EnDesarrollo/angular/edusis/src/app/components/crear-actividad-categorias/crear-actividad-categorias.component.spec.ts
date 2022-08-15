import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearActividadCategoriasComponent } from './crear-actividad-categorias.component';

describe('CrearActividadCategoriasComponent', () => {
  let component: CrearActividadCategoriasComponent;
  let fixture: ComponentFixture<CrearActividadCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearActividadCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearActividadCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
