import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailListComponent } from './order-detail-list.component';

const routes: Routes = [{ path: '', component: OrderDetailListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderDetailListRoutingModule {}
