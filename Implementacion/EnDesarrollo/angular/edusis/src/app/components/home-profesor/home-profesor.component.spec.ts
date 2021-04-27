import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProfesorComponent } from './home-profesor.component';

describe('HomeProfesorComponent', () => {
  let component: HomeProfesorComponent;
  let fixture: ComponentFixture<HomeProfesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeProfesorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
