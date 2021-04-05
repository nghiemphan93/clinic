import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailCreateComponent } from './order-detail-create.component';

const routes: Routes = [{ path: '', component: OrderDetailCreateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderDetailCreateRoutingModule {}
