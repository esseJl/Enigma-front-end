import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderModificationComponent } from './order-modification.component';

describe('OrderModificationComponent', () => {
  let component: OrderModificationComponent;
  let fixture: ComponentFixture<OrderModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderModificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
