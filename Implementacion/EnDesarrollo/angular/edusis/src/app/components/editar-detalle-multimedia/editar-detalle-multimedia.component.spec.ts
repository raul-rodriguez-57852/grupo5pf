import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDetalleMultimediaComponent } from './editar-detalle-multimedia.component';

describe('EditarDetalleMultimediaComponent', () => {
  let component: EditarDetalleMultimediaComponent;
  let fixture: ComponentFixture<EditarDetalleMultimediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarDetalleMultimediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDetalleMultimediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
