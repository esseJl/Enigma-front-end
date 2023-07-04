import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxyDayRealComponent } from './dxy-day-real.component';

describe('DxyDayRealComponent', () => {
  let component: DxyDayRealComponent;
  let fixture: ComponentFixture<DxyDayRealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxyDayRealComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxyDayRealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
