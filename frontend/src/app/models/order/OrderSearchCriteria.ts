import { EOrderType } from './EOrderType';
import { EOrderStatus } from './EOrderStatus';

export class OrderSearchCriteria {
  orderTypes?: EOrderType[];
  orderStatuses?: EOrderStatus[];
  orderTotalPriceFrom?: number;
  orderTotalPriceTo?: number;
  createdAtFrom?: Date;
  createdAtTo?: Date;
}
