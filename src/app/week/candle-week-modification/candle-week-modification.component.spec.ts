import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandleWeekModificationComponent } from './candle-week-modification.component';

describe('CandleWeekModificationComponent', () => {
  let component: CandleWeekModificationComponent;
  let fixture: ComponentFixture<CandleWeekModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandleWeekModificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandleWeekModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
