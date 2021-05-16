import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderListComponent } from './order-list/order-list.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    OrderEditComponent,
    OrderDetailComponent,
    OrderCreateComponent,
    OrderListComponent,
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    NzTypographyModule,
    NzTableModule,
    NzDropDownModule,
    FormsModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    ReactiveFormsModule,
    NzFormModule,
    NzSelectModule,
    NzPopconfirmModule,
    NzSpinModule,
    NzDatePickerModule,
    NzCheckboxModule,
    NgZorroAntdMobileModule,
    NzCardModule,
    NzSkeletonModule,
    NzDescriptionsModule,
    SharedModule,
  ],
})
export class OrderModule {}
