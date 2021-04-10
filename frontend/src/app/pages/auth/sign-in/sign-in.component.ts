import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { ERole } from '../../../models/user/ERole';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SignUpRequest } from '../../../models/user/SignUpRequest';
import { SignInRequest } from '../../../models/user/SignInRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  validateForm!: FormGroup;
  isAuth$ = new Observable<boolean>();
  isLoading = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private messageService: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this.authService.getAuth();

    this.validateForm = this.fb.group({
      userName: new FormControl('string', [Validators.required]),
      password: new FormControl('string', [Validators.required]),
    });
  }

  async submitForm(): Promise<void> {
    this.isLoading = true;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    const userName: string = this.validateForm.get('userName')?.value;
    const password: string = this.validateForm.get('password')?.value;

    const signInRequest = new SignInRequest(userName, password);

    try {
      await this.authService.signIn(signInRequest);
      this.messageService.success('signed in successfully!!!');
      this.validateForm.reset();
      await this.router.navigate(['welcome']);
    } catch (e) {
      this.messageService.error(e.message);
    } finally {
      this.isLoading = false;
    }
  }
}
