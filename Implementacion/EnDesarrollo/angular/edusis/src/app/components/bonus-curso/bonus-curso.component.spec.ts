import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusCursoComponent } from './bonus-curso.component';

describe('BonusCursoComponent', () => {
  let component: BonusCursoComponent;
  let fixture: ComponentFixture<BonusCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonusCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});