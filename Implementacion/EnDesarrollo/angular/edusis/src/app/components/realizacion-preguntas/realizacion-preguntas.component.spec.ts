import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizacionPreguntasComponent } from './realizacion-preguntas.component';

describe('RealizacionPreguntasComponent', () => {
  let component: RealizacionPreguntasComponent;
  let fixture: ComponentFixture<RealizacionPreguntasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealizacionPreguntasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizacionPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
