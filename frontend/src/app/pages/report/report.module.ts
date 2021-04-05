import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportEditComponent } from './report-edit/report-edit.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { ReportCreateComponent } from './report-create/report-create.component';
import { ReportListComponent } from './report-list/report-list.component';


@NgModule({
  declarations: [ReportEditComponent, ReportDetailComponent, ReportCreateComponent, ReportListComponent],
  imports: [
    CommonModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
