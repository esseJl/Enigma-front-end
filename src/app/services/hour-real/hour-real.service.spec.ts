import { TestBed } from '@angular/core/testing';

import { HourRealService } from './hour-real.service';

describe('HourRealService', () => {
  let service: HourRealService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HourRealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
