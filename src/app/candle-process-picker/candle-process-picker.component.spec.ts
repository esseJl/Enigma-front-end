import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandleProcessPickerComponent } from './candle-process-picker.component';

describe('CandleProcessPickerComponent', () => {
  let component: CandleProcessPickerComponent;
  let fixture: ComponentFixture<CandleProcessPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandleProcessPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandleProcessPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
