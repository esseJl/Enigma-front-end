import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandleDayHomeComponent } from './candle-day-home.component';

describe('CandleDayHomeComponent', () => {
  let component: CandleDayHomeComponent;
  let fixture: ComponentFixture<CandleDayHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandleDayHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandleDayHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
