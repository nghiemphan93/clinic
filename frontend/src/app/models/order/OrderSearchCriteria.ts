import { EOrderType } from './EOrderType';
import { EOrderStatus } from './EOrderStatus';

export class OrderSearchCriteria {
  orderType: EOrderType;
  orderStatus: EOrderStatus;
  orderTotalPriceFrom: number;
  orderTotalPriceTo: number;
  createdAtFrom: Date;
  createdAtTo: Date;

  constructor(
    orderType: EOrderType,
    orderStatus: EOrderStatus,
    orderTotalPriceFrom: number,
    orderTotalPriceTo: number,
    createdAtFrom: Date,
    createdAtTo: Date
  ) {
    this.orderType = orderType;
    this.orderStatus = orderStatus;
    this.orderTotalPriceFrom = orderTotalPriceFrom;
    this.orderTotalPriceTo = orderTotalPriceTo;
    this.createdAtFrom = createdAtFrom;
    this.createdAtTo = createdAtTo;
  }
}
