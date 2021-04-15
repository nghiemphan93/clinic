import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isCollapsed = false;
  isAuth$ = new Observable<boolean>();

  constructor(
    private authService: AuthService,
    private messageService: NzMessageService,
    private router: Router
  ) {
    this.authService.initAuth();
    this.isAuth$ = this.authService.getAuth();
  }

  async signOut() {
    this.authService.signOut();
    this.messageService.success('Signed out successfully!!!');
    await this.router.navigate(['auth/signin']);
  }
}
