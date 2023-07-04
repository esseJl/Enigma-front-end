import { TestBed } from '@angular/core/testing';

import { CandleWeekPredictService } from './candle-week-predict.service';

describe('CandleWeekPredictService', () => {
  let service: CandleWeekPredictService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandleWeekPredictService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
