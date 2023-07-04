import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAlarmComponent } from './delete-alarm.component';

describe('DeleteAlarmComponent', () => {
  let component: DeleteAlarmComponent;
  let fixture: ComponentFixture<DeleteAlarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAlarmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
