import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearActividadPasapalabraComponent } from './crear-actividad-pasapalabra.component';

describe('CrearActividadPasapalabraComponent', () => {
  let component: CrearActividadPasapalabraComponent;
  let fixture: ComponentFixture<CrearActividadPasapalabraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearActividadPasapalabraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearActividadPasapalabraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
