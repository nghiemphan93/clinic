import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillCreateComponent } from './bill-create.component';

const routes: Routes = [{ path: '', component: BillCreateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillCreateRoutingModule {}
