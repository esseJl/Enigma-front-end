import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadHourRealComponent } from './upload-hour-real.component';

describe('UploadHourRealComponent', () => {
  let component: UploadHourRealComponent;
  let fixture: ComponentFixture<UploadHourRealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadHourRealComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadHourRealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
