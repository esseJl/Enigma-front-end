import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadHourPreComponent } from './upload-hour-pre.component';

describe('UploadHourPreComponent', () => {
  let component: UploadHourPreComponent;
  let fixture: ComponentFixture<UploadHourPreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadHourPreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadHourPreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
