import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandleTempComponent } from './candle-temp.component';

describe('CandleTempComponent', () => {
  let component: CandleTempComponent;
  let fixture: ComponentFixture<CandleTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandleTempComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandleTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
