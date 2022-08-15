import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearActividadVfComponent } from './crear-actividad-vf.component';

describe('CrearActividadVfComponent', () => {
  let component: CrearActividadVfComponent;
  let fixture: ComponentFixture<CrearActividadVfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearActividadVfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearActividadVfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
