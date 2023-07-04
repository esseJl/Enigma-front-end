import { TestBed } from '@angular/core/testing';

import { HourPreService } from './hour-pre.service';

describe('HourPreService', () => {
  let service: HourPreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HourPreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
