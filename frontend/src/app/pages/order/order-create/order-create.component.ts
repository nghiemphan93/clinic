import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../../models/order/Order';
import { OrderService } from '../../../services/order.service';
import { EOrderType } from '../../../models/order/EOrderType';
import { EOrderStatus } from '../../../models/order/EOrderStatus';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss'],
})
export class OrderCreateComponent implements OnInit {
  subscription = new Subscription();
  validateForm!: FormGroup;
  isLoading = false;
  order!: Order;
  orderId!: number;
  isCreated = false;
  isUpdated = false;
  isDetailed = false;
  orderTypes: (string | EOrderType)[] = Object.entries(EOrderType).map(
    (e) => e[1]
  );
  orderStatuses: (string | EOrderStatus)[] = Object.entries(EOrderStatus).map(
    (e) => e[1]
  );

  constructor(
    private fb: FormBuilder,
    private messageService: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
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
    this.orderId = this.activatedRoute.snapshot.params.orderId;
  }

  async preparePageContent() {
    const url = this.router.url.split('/');

    switch (url[url.length - 1]) {
      case 'create':
        this.isCreated = true;
        this.order = {
          orderType: undefined,
          orderStatus: undefined,
        };
        this.prepareForm();
        break;
      case 'edit':
        this.isUpdated = true;
        this.subscription.add(
          this.orderService.getOne(this.orderId).subscribe(
            (entityFromServer) => {
              this.order = entityFromServer;
              this.prepareForm();
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
          this.orderService.getOne(this.orderId).subscribe(
            (entityFromServer) => {
              this.order = entityFromServer;
              this.prepareForm();
            },
            (e) => {
              this.messageService.error(e.message);
            }
          )
        );
        break;
    }
  }

  prepareForm() {
    this.validateForm = this.fb.group({
      orderType: new FormControl(this.order?.orderType, [Validators.required]),
      orderStatus: new FormControl(this.order?.orderStatus, [
        Validators.required,
      ]),
    });
  }

  async submitForm(): Promise<void> {
    this.isLoading = true;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.order = {
      id: this.orderId,
      orderType: this.validateForm.get('orderType')?.value,
      orderStatus: this.validateForm.get('orderStatus')?.value,
      orderTotalPrice: this.isCreated ? 0 : this.order.orderTotalPrice,
    };

    try {
      if (this.validateForm.valid) {
        if (this.isCreated) {
          await this.orderService.create(this.order).toPromise();
          this.messageService.success('order created successfully!!!');
        }

        if (this.isUpdated) {
          await this.orderService.update(this.orderId, this.order).toPromise();
          this.messageService.success('order updated successfully!!!');
        }
        this.validateForm.reset();
        await this.router.navigate(['orders']);
      }
    } catch (e) {
      this.messageService.error(e.message);
    } finally {
      this.isLoading = false;
    }
  }

  async delete() {
    try {
      this.isLoading = true;
      await this.orderService.delete(this.orderId).toPromise();
      this.messageService.success('deleted!!!');
      await this.router.navigate(['orders']);
    } catch (e) {
      this.messageService.error(e.message);
    } finally {
      this.isLoading = false;
    }
  }
}
