import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxyDayComponent } from './dxy-day.component';

describe('DxyDayComponent', () => {
  let component: DxyDayComponent;
  let fixture: ComponentFixture<DxyDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxyDayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxyDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
