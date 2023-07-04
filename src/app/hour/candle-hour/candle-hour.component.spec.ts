import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandleHourComponent } from './candle-hour.component';

describe('CandleHourComponent', () => {
  let component: CandleHourComponent;
  let fixture: ComponentFixture<CandleHourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandleHourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandleHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
