import { BaseEntity } from '../base/BaseEntity';
import { EReportPeriod } from './EReportPeriod';

export class Report extends BaseEntity {
  reportPeriod?: EReportPeriod;
  beforeQuantity?: number;
  afterQuantity?: number;
  totalPriceIn?: number;
  totalPriceOut?: number;
}
