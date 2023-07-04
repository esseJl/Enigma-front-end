import { TestBed } from '@angular/core/testing';

import { DxyDayRealService } from './dxy-day-real.service';

describe('DxyDayRealService', () => {
  let service: DxyDayRealService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DxyDayRealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
