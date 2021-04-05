import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailComponent } from './order-detail.component';

const routes: Routes = [
  { path: '', component: OrderDetailComponent },
  {
    path: 'orderDetails',
    loadChildren: () =>
      import('./order-detail-detail/order-detail-detail.module').then(
        (m) => m.OrderDetailDetailModule
      ),
  },
  {
    path: 'bills',
    loadChildren: () => import('./bill/bill.module').then((m) => m.BillModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderDetailRoutingModule {}
