import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderDetailDetailRoutingModule } from './order-detail-detail-routing.module';
import { OrderDetailListComponent } from './order-detail-list/order-detail-list.component';
import { OrderDetailDetailComponent } from './order-detail-detail/order-detail-detail.component';
import { OrderDetailEditComponent } from './order-detail-edit/order-detail-edit.component';
import { OrderDetailCreateComponent } from './order-detail-create/order-detail-create.component';
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
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [
    OrderDetailListComponent,
    OrderDetailDetailComponent,
    OrderDetailEditComponent,
    OrderDetailCreateComponent,
  ],
  imports: [
    CommonModule,
    OrderDetailDetailRoutingModule,
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
export class OrderDetailDetailModule {}
