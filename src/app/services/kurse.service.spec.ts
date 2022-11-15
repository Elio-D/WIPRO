import { TestBed } from '@angular/core/testing';

import { KurseService } from './kurse.service';

describe('KurseService', () => {
  let service: KurseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KurseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
