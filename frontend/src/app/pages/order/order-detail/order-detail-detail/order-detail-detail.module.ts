import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderDetailDetailRoutingModule } from './order-detail-detail-routing.module';
import { OrderDetailListComponent } from './order-detail-list/order-detail-list.component';
import { OrderDetailDetailComponent } from './order-detail-detail/order-detail-detail.component';
import { OrderDetailEditComponent } from './order-detail-edit/order-detail-edit.component';
import { OrderDetailCreateComponent } from './order-detail-create/order-detail-create.component';


@NgModule({
  declarations: [OrderDetailListComponent, OrderDetailDetailComponent, OrderDetailEditComponent, OrderDetailCreateComponent],
  imports: [
    CommonModule,
    OrderDetailDetailRoutingModule
  ]
})
export class OrderDetailDetailModule { }
