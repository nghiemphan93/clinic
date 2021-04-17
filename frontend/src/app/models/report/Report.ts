import { BaseEntity } from '../base/BaseEntity';
import { EReportPeriod } from './EReportPeriod';

export class Report extends BaseEntity {
  reportPeriod: EReportPeriod;
  beforeQuantity: number;
  afterQuantity: number;
  totalPriceIn: number;
  totalPriceOut: number;

  constructor(
    reportPeriod: EReportPeriod,
    beforeQuantity: number,
    afterQuantity: number,
    totalPriceIn: number,
    totalPriceOut: number
  ) {
    super();
    this.reportPeriod = reportPeriod;
    this.beforeQuantity = beforeQuantity;
    this.afterQuantity = afterQuantity;
    this.totalPriceIn = totalPriceIn;
    this.totalPriceOut = totalPriceOut;
  }
}
