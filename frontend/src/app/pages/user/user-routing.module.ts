import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./user-list/user-list.module').then((m) => m.UserListModule),
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./user-create/user-create.module').then(
        (m) => m.UserCreateModule
      ),
  },
  {
    path: ':userId',
    loadChildren: () =>
      import('./user-detail/user-detail.module').then(
        (m) => m.UserDetailModule
      ),
  },
  {
    path: ':userId/edit',
    loadChildren: () =>
      import('./user-edit/user-edit.module').then((m) => m.UserEditModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
