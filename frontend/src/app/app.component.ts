import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isCollapsed = false;
  isAuth$ = new Observable<boolean>();
  isMobile!: boolean;

  constructor(
    private authService: AuthService,
    private messageService: NzMessageService,
    private router: Router,
    private deviceService: DeviceDetectorService
  ) {
    this.authService.initAuth();
    this.isAuth$ = this.authService.getAuth();
    this.isMobile = this.deviceService.isMobile();
  }

  async signOut() {
    this.isCollapsed = true;
    this.authService.signOut();
    this.messageService.success('Signed out successfully!!!');
    await this.router.navigate(['auth/signin']);
  }

  collapseMenu() {
    this.isCollapsed = true;
  }
}
