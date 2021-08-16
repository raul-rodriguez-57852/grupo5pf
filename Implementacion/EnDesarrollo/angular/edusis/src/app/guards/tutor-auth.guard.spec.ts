import { TestBed } from '@angular/core/testing';

import { TutorAuthGuard } from './tutor-auth.guard';

describe('TutorAuthGuard', () => {
  let guard: TutorAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TutorAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
