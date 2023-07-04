import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandleWeekComponent } from './candle-week.component';

describe('CandleWeekComponent', () => {
  let component: CandleWeekComponent;
  let fixture: ComponentFixture<CandleWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandleWeekComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandleWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
