import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizacionVfComponent } from './realizacion-vf.component';

describe('RealizacionVfComponent', () => {
  let component: RealizacionVfComponent;
  let fixture: ComponentFixture<RealizacionVfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealizacionVfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizacionVfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
