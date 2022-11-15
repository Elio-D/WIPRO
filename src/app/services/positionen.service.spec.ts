import { TestBed } from '@angular/core/testing';

import { PositionenService } from './positionen.service';

describe('PositionenService', () => {
  let service: PositionenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PositionenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
