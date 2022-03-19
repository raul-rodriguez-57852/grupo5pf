import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizacionPasapalabraComponent } from './realizacion-pasapalabra.component';

describe('RealizacionPasapalabraComponent', () => {
  let component: RealizacionPasapalabraComponent;
  let fixture: ComponentFixture<RealizacionPasapalabraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealizacionPasapalabraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizacionPasapalabraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
