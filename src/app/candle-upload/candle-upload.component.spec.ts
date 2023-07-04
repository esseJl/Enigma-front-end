import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandleUploadComponent } from './candle-upload.component';

describe('CandleUploadComponent', () => {
  let component: CandleUploadComponent;
  let fixture: ComponentFixture<CandleUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandleUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandleUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
