import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { ERole } from '../models/user/ERole';
import { User } from '../models/user/User';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const requiredRoles = (route.data.roles as unknown) as Set<ERole>;
    return this.authService.getUser().pipe(
      map((currentUser) => {
        if (currentUser) {
          return this.hasRole(requiredRoles, currentUser);
        } else {
          this.router.navigate(['auth/signin']);
          return false;
        }
      })
    );
  }

  private hasRole(requiredRoles: Set<ERole>, currentUser: User) {
    let hasRole = false;
    requiredRoles.forEach((requiredRole: ERole) => {
      if (
        currentUser?.roles?.findIndex((role) => role.role === requiredRole) !==
        -1
      ) {
        hasRole = true;
      }
    });
    if (hasRole) {
      return true;
    }
    this.router.navigate(['products']);
    return false;
  }
}
