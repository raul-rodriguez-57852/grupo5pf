import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizacionGrillaComponent } from './realizacion-grilla.component';

describe('RealizacionGrillaComponent', () => {
  let component: RealizacionGrillaComponent;
  let fixture: ComponentFixture<RealizacionGrillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealizacionGrillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizacionGrillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
