import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';

@NgModule({
  declarations: [UserListComponent, UserCreateComponent, UserDetailComponent, UserEditComponent],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
