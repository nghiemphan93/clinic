import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailEditComponent } from './order-detail-edit.component';

const routes: Routes = [{ path: '', component: OrderDetailEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderDetailEditRoutingModule {}
