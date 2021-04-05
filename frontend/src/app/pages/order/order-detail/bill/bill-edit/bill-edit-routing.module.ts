import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillEditComponent } from './bill-edit.component';

const routes: Routes = [{ path: '', component: BillEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillEditRoutingModule {}
