import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./bill-list/bill-list.module').then((m) => m.BillListModule),
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./bill-create/bill-create.module').then(
        (m) => m.BillCreateModule
      ),
  },
  {
    path: ':billId',
    loadChildren: () =>
      import('./bill-detail/bill-detail.module').then(
        (m) => m.BillDetailModule
      ),
  },
  {
    path: ':billId/edit',
    loadChildren: () =>
      import('./bill-edit/bill-edit.module').then((m) => m.BillEditModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillRoutingModule {}
