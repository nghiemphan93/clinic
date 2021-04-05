import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailDetailComponent } from './order-detail-detail.component';

describe('OrderDetailDetailComponent', () => {
  let component: OrderDetailDetailComponent;
  let fixture: ComponentFixture<OrderDetailDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDetailDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
