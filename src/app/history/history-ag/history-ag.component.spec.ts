import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryAgComponent } from './history-ag.component';

describe('HistoryAgComponent', () => {
  let component: HistoryAgComponent;
  let fixture: ComponentFixture<HistoryAgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryAgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryAgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
