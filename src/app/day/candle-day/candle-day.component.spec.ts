import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CandleDayComponent} from './candle-day.component';

describe('CandleDayComponent', () => {
  let component: CandleDayComponent;
  let fixture: ComponentFixture<CandleDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandleDayComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CandleDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
