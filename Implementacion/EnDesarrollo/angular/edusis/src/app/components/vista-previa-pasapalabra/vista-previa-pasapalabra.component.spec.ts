import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPreviaPasapalabraComponent } from './vista-previa-pasapalabra.component';

describe('VistaPreviaPasapalabraComponent', () => {
  let component: VistaPreviaPasapalabraComponent;
  let fixture: ComponentFixture<VistaPreviaPasapalabraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaPreviaPasapalabraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaPreviaPasapalabraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
