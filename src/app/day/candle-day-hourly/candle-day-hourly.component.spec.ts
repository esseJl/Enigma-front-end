import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandleDayHourlyComponent } from './candle-day-hourly.component';

describe('CandleDayHourlyComponent', () => {
  let component: CandleDayHourlyComponent;
  let fixture: ComponentFixture<CandleDayHourlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandleDayHourlyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandleDayHourlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
