import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDayRealComponent } from './upload-day-real.component';

describe('UploadDayRealComponent', () => {
  let component: UploadDayRealComponent;
  let fixture: ComponentFixture<UploadDayRealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadDayRealComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadDayRealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
