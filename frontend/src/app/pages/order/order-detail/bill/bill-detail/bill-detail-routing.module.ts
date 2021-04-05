import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillDetailComponent } from './bill-detail.component';

const routes: Routes = [{ path: '', component: BillDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillDetailRoutingModule {}
