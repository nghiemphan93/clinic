import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderCreateComponent } from './order-create.component';

const routes: Routes = [{ path: '', component: OrderCreateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderCreateRoutingModule {}
