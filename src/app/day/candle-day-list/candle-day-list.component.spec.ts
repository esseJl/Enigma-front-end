import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandleDayListComponent } from './candle-day-list.component';

describe('CandleDayListComponent', () => {
  let component: CandleDayListComponent;
  let fixture: ComponentFixture<CandleDayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandleDayListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandleDayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
