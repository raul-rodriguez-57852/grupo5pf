import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizacionPasapalabrasComponent } from './realizacion-pasapalabras.component';

describe('RealizacionPasapalabrasComponent', () => {
  let component: RealizacionPasapalabrasComponent;
  let fixture: ComponentFixture<RealizacionPasapalabrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealizacionPasapalabrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizacionPasapalabrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
