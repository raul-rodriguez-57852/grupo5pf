import { TestBed } from '@angular/core/testing';

import { DocenteAuthGuard } from './docente-auth.guard';

describe('DocenteAuthGuard', () => {
  let guard: DocenteAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DocenteAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
