import { TestBed } from '@angular/core/testing';

import { KompetenzenService } from './kompetenzen.service';

describe('KompetenzenService', () => {
  let service: KompetenzenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KompetenzenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
