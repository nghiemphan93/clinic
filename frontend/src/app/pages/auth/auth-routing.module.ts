import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/signin' },
  {
    path: 'signin',
    loadChildren: () =>
      import('./sign-in/sign-in.module').then((m) => m.SignInModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./sign-up/sign-up.module').then((m) => m.SignUpModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
