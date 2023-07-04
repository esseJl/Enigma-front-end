import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandleDayModificationComponent } from './candle-day-modification.component';

describe('CandleDayModificationComponent', () => {
  let component: CandleDayModificationComponent;
  let fixture: ComponentFixture<CandleDayModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandleDayModificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandleDayModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
