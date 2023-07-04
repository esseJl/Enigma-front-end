import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandleProcessComponent } from './candle-process.component';

describe('CandleProcessComponent', () => {
  let component: CandleProcessComponent;
  let fixture: ComponentFixture<CandleProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandleProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandleProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
