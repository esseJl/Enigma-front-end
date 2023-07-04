import { TestBed } from '@angular/core/testing';

import { CandleWeekRealService } from './candle-week-real.service';

describe('CandleWeekRealService', () => {
  let service: CandleWeekRealService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandleWeekRealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
