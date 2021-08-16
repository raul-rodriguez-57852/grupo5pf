import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionTutorComponent } from './configuracion-tutor.component';

describe('HomeComponent', () => {
  let component: ConfiguracionTutorComponent;
  let fixture: ComponentFixture<ConfiguracionTutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracionTutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
