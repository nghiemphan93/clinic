import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserEditRoutingModule } from './user-edit-routing.module';
import { UserCreateModule } from '../user-create/user-create.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, UserEditRoutingModule, UserCreateModule],
})
export class UserEditModule {}
