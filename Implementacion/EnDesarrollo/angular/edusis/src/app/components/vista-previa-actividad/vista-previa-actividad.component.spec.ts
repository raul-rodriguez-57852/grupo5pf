import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPreviaActividadComponent } from './vista-previa-actividad.component';

describe('VistaPreviaActividadComponent', () => {
  let component: VistaPreviaActividadComponent;
  let fixture: ComponentFixture<VistaPreviaActividadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaPreviaActividadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaPreviaActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
