import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailCreateComponent } from './order-detail-create.component';

describe('OrderDetailCreateComponent', () => {
  let component: OrderDetailCreateComponent;
  let fixture: ComponentFixture<OrderDetailCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDetailCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
