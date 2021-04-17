import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ERole } from '../../../models/user/ERole';
import { AuthService } from '../../../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../models/user/User';
import { UserService } from '../../../services/user.service';
import { Role } from '../../../models/user/Role';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  validateForm!: FormGroup;
  roles: Set<ERole> = new Set([
    ERole.ROLE_DOCTOR,
    ERole.ROLE_MANAGER,
    ERole.ROLE_NURSE,
  ]);
  roles$!: Observable<Role[]>;
  isLoading = false;
  userId = 0;
  user!: User;
  isCreated = false;
  isUpdated = false;
  isDetailed = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private messageService: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    this.preparePageAttributes();
    await this.preparePageContent();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  preparePageAttributes() {
    this.userId = this.activatedRoute.snapshot.params.userId;
    this.roles$ = this.userService.getAllRoles();
  }

  async preparePageContent() {
    const url = this.router.url.split('/');

    switch (url[url.length - 1]) {
      case 'create':
        this.isCreated = true;
        const newUser = new User();
        newUser.username = '';
        newUser.email = '';
        newUser.roles = [new Role(ERole.ROLE_NURSE)];
        this.user = newUser;
        this.prepareFormCreate();
        break;
      case 'edit':
        this.isUpdated = true;
        this.subscription.add(
          this.userService.getOne(this.userId).subscribe(
            (entityFromServer) => {
              this.user = entityFromServer;
              this.prepareFormUpdateOrDetail();
            },
            (e) => {
              this.messageService.error(e.message);
            }
          )
        );
        break;
      default:
        this.isDetailed = true;
        this.subscription.add(
          this.userService.getOne(this.userId).subscribe(
            (entityFromServer) => {
              this.user = entityFromServer;
              this.prepareFormUpdateOrDetail();
            },
            (e) => {
              this.messageService.error(e.message);
            }
          )
        );
        break;
    }
  }

  prepareFormCreate() {
    this.validateForm = this.fb.group({
      userName: new FormControl(this.user.username, [Validators.required]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email,
      ]),
      roles: new FormControl([], [Validators.required]),
    });
  }

  prepareFormUpdateOrDetail() {
    this.validateForm = this.fb.group({
      userName: new FormControl(this.user?.username, [Validators.required]),
      email: new FormControl(this.user?.email, [
        Validators.required,
        Validators.email,
      ]),
      roles: new FormControl(this.user?.roles, [Validators.required]),
    });
  }

  async submitForm(): Promise<void> {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.user = {
      id: this.userId,
      username: this.validateForm.get('userName')?.value,
      email: this.validateForm.get('email')?.value,
      roles: this.validateForm.get('roles')?.value,
    };

    try {
      this.isLoading = true;
      if (this.isCreated) {
        await this.userService.create(this.user).toPromise();
        this.messageService.success('user created successfully!!!');
      }

      if (this.isUpdated) {
        await this.userService.update(this.userId, this.user).toPromise();
        this.messageService.success('user updated successfully!!!');
      }
      this.validateForm.reset();
      await this.router.navigate(['users']);
    } catch (e) {
      this.messageService.error(e.message);
    } finally {
      this.isLoading = false;
    }
  }

  async delete() {
    try {
      this.isLoading = true;
      await this.userService.delete(this.userId).toPromise();
      this.messageService.success('deleted!!!');
      await this.router.navigate(['users']);
    } catch (e) {
      this.messageService.error(e.message);
    } finally {
      this.isLoading = false;
    }
  }
}
