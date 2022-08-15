import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPreviaVfComponent } from './vista-previa-vf.component';

describe('VistaPreviaVfComponent', () => {
  let component: VistaPreviaVfComponent;
  let fixture: ComponentFixture<VistaPreviaVfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaPreviaVfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaPreviaVfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
