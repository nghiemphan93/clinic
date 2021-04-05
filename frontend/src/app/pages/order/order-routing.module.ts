import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./order-list/order-list.module').then((m) => m.OrderListModule),
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./order-create/order-create.module').then(
        (m) => m.OrderCreateModule
      ),
  },
  {
    path: ':orderId',
    loadChildren: () =>
      import('./order-detail/order-detail.module').then(
        (m) => m.OrderDetailModule
      ),
  },
  {
    path: ':orderId/edit',
    loadChildren: () =>
      import('./order-edit/order-edit.module').then((m) => m.OrderEditModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
