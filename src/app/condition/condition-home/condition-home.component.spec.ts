import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionHomeComponent } from './condition-home.component';

describe('ConditionHomeComponent', () => {
  let component: ConditionHomeComponent;
  let fixture: ComponentFixture<ConditionHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
