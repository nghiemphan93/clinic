import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ERole } from '../../../models/user/ERole';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SignUpRequest } from '../../../models/user/SignUpRequest';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  validateForm!: FormGroup;
  roles: Set<ERole> = new Set([
    ERole.ROLE_DOCTOR,
    ERole.ROLE_MANAGER,
    ERole.ROLE_NURSE,
  ]);
  isLoading = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private messageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: new FormControl('string', [Validators.required]),
      password: new FormControl('string', [Validators.required]),
      email: new FormControl('string@string.com', [
        Validators.required,
        Validators.email,
      ]),
      roles: new FormControl([ERole.ROLE_MANAGER], [Validators.required]),
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
    const email: string = this.validateForm.get('email')?.value;
    const roles: Set<ERole> = this.validateForm.get('roles')?.value;

    const signUpRequest = new SignUpRequest(userName, email, roles, password);

    try {
      await this.authService.signUp(signUpRequest);
      this.messageService.success('user created successfully!!!');
      this.validateForm.reset();
    } catch (e) {
      this.messageService.error(e.message);
    } finally {
      this.isLoading = false;
    }
  }
}
