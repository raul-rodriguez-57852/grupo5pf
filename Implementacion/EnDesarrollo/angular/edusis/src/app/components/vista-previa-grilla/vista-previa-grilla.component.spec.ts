import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPreviaGrillaComponent } from './vista-previa-grilla.component';

describe('VistaPreviaGrillaComponent', () => {
  let component: VistaPreviaGrillaComponent;
  let fixture: ComponentFixture<VistaPreviaGrillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaPreviaGrillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaPreviaGrillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
