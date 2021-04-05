import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./report-list/report-list.module').then(
        (m) => m.ReportListModule
      ),
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./report-create/report-create.module').then(
        (m) => m.ReportCreateModule
      ),
  },
  {
    path: ':reportId',
    loadChildren: () =>
      import('./report-detail/report-detail.module').then(
        (m) => m.ReportDetailModule
      ),
  },
  {
    path: ':reportId/edit',
    loadChildren: () =>
      import('./report-edit/report-edit.module').then(
        (m) => m.ReportEditModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
