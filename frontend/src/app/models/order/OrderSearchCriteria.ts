import { EOrderType } from './EOrderType';
import { EOrderStatus } from './EOrderStatus';

export class OrderSearchCriteria {
  orderType?: EOrderType;
  orderStatus?: EOrderStatus;
  orderTotalPriceFrom?: number;
  orderTotalPriceTo?: number;
  createdAtFrom?: Date;
  createdAtTo?: Date;
}
