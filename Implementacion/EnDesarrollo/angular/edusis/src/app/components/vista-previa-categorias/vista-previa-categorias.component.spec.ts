import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPreviaCategoriasComponent } from './vista-previa-categorias.component';

describe('VistaPreviaCategoriasComponent', () => {
  let component: VistaPreviaCategoriasComponent;
  let fixture: ComponentFixture<VistaPreviaCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaPreviaCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaPreviaCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
