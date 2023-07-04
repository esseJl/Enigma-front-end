import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxyWeekHomeComponent } from './dxy-week-home.component';

describe('DxyWeekHomeComponent', () => {
  let component: DxyWeekHomeComponent;
  let fixture: ComponentFixture<DxyWeekHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxyWeekHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxyWeekHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
