import { TestBed } from '@angular/core/testing';

import { CandleDayPredictService } from './candle-day-predict.service';

describe('CandleDayPredictService', () => {
  let service: CandleDayPredictService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandleDayPredictService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
