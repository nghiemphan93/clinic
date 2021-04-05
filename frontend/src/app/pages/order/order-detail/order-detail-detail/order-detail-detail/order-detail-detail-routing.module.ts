import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailDetailComponent } from './order-detail-detail.component';

const routes: Routes = [{ path: '', component: OrderDetailDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderDetailDetailRoutingModule {}
