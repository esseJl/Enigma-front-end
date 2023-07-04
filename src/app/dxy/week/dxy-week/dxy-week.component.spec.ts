import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxyWeekComponent } from './dxy-week.component';

describe('DxyWeekComponent', () => {
  let component: DxyWeekComponent;
  let fixture: ComponentFixture<DxyWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxyWeekComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxyWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
