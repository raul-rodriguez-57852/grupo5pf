import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizacionCategoriasComponent } from './realizacion-categorias.component';

describe('RealizacionCategoriasComponent', () => {
  let component: RealizacionCategoriasComponent;
  let fixture: ComponentFixture<RealizacionCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealizacionCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizacionCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
