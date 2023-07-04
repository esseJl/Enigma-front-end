import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadOrderN1d1Component } from './upload-order-n1d1.component';

describe('UploadOrderN1d1Component', () => {
  let component: UploadOrderN1d1Component;
  let fixture: ComponentFixture<UploadOrderN1d1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadOrderN1d1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadOrderN1d1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
