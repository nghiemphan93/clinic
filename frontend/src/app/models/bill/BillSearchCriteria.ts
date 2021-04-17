import { EOrderType } from '../order/EOrderType';
import { EOrderStatus } from '../order/EOrderStatus';

export class BillSearchCriteria {
  billType?: EOrderType;
  billStatus?: EOrderStatus;
  billTotalPriceFrom?: number;
  billTotalPriceTo?: number;
  createdAtFrom?: Date;
  createdAtTo?: Date;
  orderId?: number;
}
