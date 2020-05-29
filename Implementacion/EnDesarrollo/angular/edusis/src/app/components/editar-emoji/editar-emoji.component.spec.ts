import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEmojiComponent } from './editar-emoji.component';

describe('EditarEmojiComponent', () => {
  let component: EditarEmojiComponent;
  let fixture: ComponentFixture<EditarEmojiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarEmojiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEmojiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
