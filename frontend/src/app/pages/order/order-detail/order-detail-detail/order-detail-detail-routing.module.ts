import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./order-detail-list/order-detail-list.module').then(
        (m) => m.OrderDetailListModule
      ),
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./order-detail-create/order-detail-create.module').then(
        (m) => m.OrderDetailCreateModule
      ),
  },
  {
    path: ':orderDetailId',
    loadChildren: () =>
      import('./order-detail-detail/order-detail-detail.module').then(
        (m) => m.OrderDetailDetailModule
      ),
  },
  {
    path: ':orderDetailId/edit',
    loadChildren: () =>
      import('./order-detail-edit/order-detail-edit.module').then(
        (m) => m.OrderDetailEditModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderDetailDetailRoutingModule {}
