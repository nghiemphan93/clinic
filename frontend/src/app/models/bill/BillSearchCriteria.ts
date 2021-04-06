import { EOrderType } from '../order/EOrderType';
import { EOrderStatus } from '../order/EOrderStatus';
import { Data } from '@angular/router';
import { Order } from '../order/Order';

export class BillSearchCriteria {
  billType: EOrderType;
  billStatus: EOrderStatus;
  billTotalPriceFrom: number;
  billTotalPriceTo: number;
  createdAtFrom: Date;
  createdAtTo: Date;
  orderId: number;

  constructor(
    billType: EOrderType,
    billStatus: EOrderStatus,
    billTotalPriceFrom: number,
    billTotalPriceTo: number,
    createdAtFrom: Date,
    createdAtTo: Date,
    orderId: number
  ) {
    this.billType = billType;
    this.billStatus = billStatus;
    this.billTotalPriceFrom = billTotalPriceFrom;
    this.billTotalPriceTo = billTotalPriceTo;
    this.createdAtFrom = createdAtFrom;
    this.createdAtTo = createdAtTo;
    this.orderId = orderId;
  }
}
