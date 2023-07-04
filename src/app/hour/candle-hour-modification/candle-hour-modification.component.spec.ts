import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandleHourModificationComponent } from './candle-hour-modification.component';

describe('CandleHourModificationComponent', () => {
  let component: CandleHourModificationComponent;
  let fixture: ComponentFixture<CandleHourModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandleHourModificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandleHourModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
