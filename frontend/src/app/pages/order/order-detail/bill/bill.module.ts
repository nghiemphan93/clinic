import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillRoutingModule } from './bill-routing.module';
import { BillEditComponent } from './bill-edit/bill-edit.component';
import { BillDetailComponent } from './bill-detail/bill-detail.component';
import { BillCreateComponent } from './bill-create/bill-create.component';
import { BillListComponent } from './bill-list/bill-list.component';


@NgModule({
  declarations: [BillEditComponent, BillDetailComponent, BillCreateComponent, BillListComponent],
  imports: [
    CommonModule,
    BillRoutingModule
  ]
})
export class BillModule { }
