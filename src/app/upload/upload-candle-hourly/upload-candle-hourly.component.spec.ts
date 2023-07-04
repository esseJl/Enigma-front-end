import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCandleHourlyComponent } from './upload-candle-hourly.component';

describe('UploadCandleHourlyComponent', () => {
  let component: UploadCandleHourlyComponent;
  let fixture: ComponentFixture<UploadCandleHourlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCandleHourlyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadCandleHourlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
