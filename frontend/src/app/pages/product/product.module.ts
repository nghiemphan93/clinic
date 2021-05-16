import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
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
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductDetailComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
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
    NgZorroAntdMobileModule,
    NzCardModule,
    NzSkeletonModule,
    NzDescriptionsModule,
    SharedModule,
  ],
})
export class ProductModule {}
