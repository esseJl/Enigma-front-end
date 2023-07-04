import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadWeekPreComponent } from './upload-week-pre.component';

describe('UploadWeekPreComponent', () => {
  let component: UploadWeekPreComponent;
  let fixture: ComponentFixture<UploadWeekPreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadWeekPreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadWeekPreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
