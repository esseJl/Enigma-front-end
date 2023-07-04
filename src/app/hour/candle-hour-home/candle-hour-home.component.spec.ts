import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandleHourHomeComponent } from './candle-hour-home.component';

describe('CandleHourHomeComponent', () => {
  let component: CandleHourHomeComponent;
  let fixture: ComponentFixture<CandleHourHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandleHourHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandleHourHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
