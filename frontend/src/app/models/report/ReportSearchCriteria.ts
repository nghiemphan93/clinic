import { EReportPeriod } from './EReportPeriod';

export class ReportSearchCriteria {
  reportPeriod: EReportPeriod;
  createdAtFrom: Date;
  createdAtTo: Date;

  constructor(
    reportPeriod: EReportPeriod,
    createdAtFrom: Date,
    createdAtTo: Date
  ) {
    this.reportPeriod = reportPeriod;
    this.createdAtFrom = createdAtFrom;
    this.createdAtTo = createdAtTo;
  }
}
