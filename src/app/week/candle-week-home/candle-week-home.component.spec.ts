import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandleWeekHomeComponent } from './candle-week-home.component';

describe('CandleWeekHomeComponent', () => {
  let component: CandleWeekHomeComponent;
  let fixture: ComponentFixture<CandleWeekHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandleWeekHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandleWeekHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
