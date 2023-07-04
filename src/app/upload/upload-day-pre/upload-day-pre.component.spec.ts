import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDayPreComponent } from './upload-day-pre.component';

describe('UploadDayPreComponent', () => {
  let component: UploadDayPreComponent;
  let fixture: ComponentFixture<UploadDayPreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadDayPreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadDayPreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
