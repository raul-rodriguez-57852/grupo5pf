import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizacionTareaComponent } from './realizacion-tarea.component';

describe('RealizacionTareaComponent', () => {
  let component: RealizacionTareaComponent;
  let fixture: ComponentFixture<RealizacionTareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealizacionTareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizacionTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
