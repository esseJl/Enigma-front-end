import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadWeekRealComponent } from './upload-week-real.component';

describe('UploadWeekRealComponent', () => {
  let component: UploadWeekRealComponent;
  let fixture: ComponentFixture<UploadWeekRealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadWeekRealComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadWeekRealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
