import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDxyDayRealComponent } from './upload-dxy-day-real.component';

describe('UploadDxyDayRealComponent', () => {
  let component: UploadDxyDayRealComponent;
  let fixture: ComponentFixture<UploadDxyDayRealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadDxyDayRealComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadDxyDayRealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
