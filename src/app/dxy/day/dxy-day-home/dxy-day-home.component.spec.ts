import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxyDayHomeComponent } from './dxy-day-home.component';

describe('DxyDayHomeComponent', () => {
  let component: DxyDayHomeComponent;
  let fixture: ComponentFixture<DxyDayHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxyDayHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxyDayHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
