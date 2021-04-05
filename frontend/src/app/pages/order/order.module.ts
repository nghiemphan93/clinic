import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderListComponent } from './order-list/order-list.component';


@NgModule({
  declarations: [OrderEditComponent, OrderDetailComponent, OrderCreateComponent, OrderListComponent],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
