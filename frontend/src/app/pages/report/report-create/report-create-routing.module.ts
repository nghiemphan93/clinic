import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportCreateComponent } from './report-create.component';

const routes: Routes = [{ path: '', component: ReportCreateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportCreateRoutingModule {}
