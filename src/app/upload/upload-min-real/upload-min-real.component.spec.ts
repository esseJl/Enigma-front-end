import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMinRealComponent } from './upload-min-real.component';

describe('UploadMinRealComponent', () => {
  let component: UploadMinRealComponent;
  let fixture: ComponentFixture<UploadMinRealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadMinRealComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadMinRealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
