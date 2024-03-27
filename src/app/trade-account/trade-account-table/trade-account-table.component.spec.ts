import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeAccountTableComponent } from './trade-account-table.component';

describe('TradeAccountTableComponent', () => {
  let component: TradeAccountTableComponent;
  let fixture: ComponentFixture<TradeAccountTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeAccountTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeAccountTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
