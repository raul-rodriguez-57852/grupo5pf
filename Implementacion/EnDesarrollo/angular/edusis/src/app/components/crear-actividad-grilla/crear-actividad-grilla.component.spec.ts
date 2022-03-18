import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearActividadGrillaComponent } from './crear-actividad-grilla.component';

describe('CrearActividadGrillaComponent', () => {
  let component: CrearActividadGrillaComponent;
  let fixture: ComponentFixture<CrearActividadGrillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearActividadGrillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearActividadGrillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
