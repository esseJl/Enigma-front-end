import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionModificationComponent } from './condition-modification.component';

describe('ConditionModificationComponent', () => {
  let component: ConditionModificationComponent;
  let fixture: ComponentFixture<ConditionModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionModificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
