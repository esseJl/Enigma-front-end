import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDxyComponent } from './upload-dxy.component';

describe('UploadDxyComponent', () => {
  let component: UploadDxyComponent;
  let fixture: ComponentFixture<UploadDxyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadDxyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadDxyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
