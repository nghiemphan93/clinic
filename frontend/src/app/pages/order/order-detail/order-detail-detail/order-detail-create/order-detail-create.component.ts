import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../../../services/order.service';
import { OrderDetail } from '../../../../../models/orderdetail/OrderDetail';
import { OrderDetailService } from '../../../../../services/order-detail.service';
import { Product } from '../../../../../models/product/Product';
import { ProductService } from '../../../../../services/product.service';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { BasePage } from '../../../../../models/base/BasePage';
import { BaseEntity } from '../../../../../models/base/BaseEntity';

@Component({
  selector: 'app-order-detail-create',
  templateUrl: './order-detail-create.component.html',
  styleUrls: ['./order-detail-create.component.scss'],
})
export class OrderDetailCreateComponent implements OnInit {
  subscription = new Subscription();
  validateForm!: FormGroup;
  isLoading = false;
  orderDetail!: OrderDetail;
  orderDetailId!: number;
  orderId!: number;
  isCreated = false;
  isUpdated = false;
  isDetailed = false;
  products$!: Observable<Product[]>;
  isLoadingProducts = false;
  products: Product[] = [];
  searchProductsChange$ = new BehaviorSubject('');

  constructor(
    private fb: FormBuilder,
    private messageService: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private productService: ProductService
  ) {}

  async ngOnInit(): Promise<void> {
    this.preparePageAttributes();
    await this.preparePageContent();

    const getSearchedProducts = (productName: string) =>
      this.productService
        .getAll(new BasePage(), { productName: productName })
        .pipe(
          map((baseResponse) => {
            return baseResponse.content;
          })
        );
    this.searchProductsChange$
      .asObservable()
      .pipe(debounceTime(500))
      .pipe(switchMap(getSearchedProducts))
      .subscribe((searchedProductsFromServer) => {
        this.products = searchedProductsFromServer;
        this.isLoadingProducts = false;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  preparePageAttributes() {
    this.orderId = this.activatedRoute.snapshot.params.orderId;
    this.orderDetailId = this.activatedRoute.snapshot.params.orderDetailId;
    this.products$ = this.productService
      .getAll()
      .pipe(map((baseResponse) => baseResponse.content));
  }

  async preparePageContent() {
    const url = this.router.url.split('/');

    switch (url[url.length - 1]) {
      case 'create':
        this.isCreated = true;
        this.orderDetail = {
          order: undefined,
          product: undefined,
          quantity: undefined,
          totalPricePerProduct: undefined,
        };
        this.prepareForm();
        break;
      case 'edit':
        this.isUpdated = true;
        this.subscription.add(
          this.orderDetailService
            .getOne(this.orderDetailId, this.orderId)
            .subscribe(
              (entityFromServer) => {
                this.orderDetail = entityFromServer;
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
          this.orderDetailService
            .getOne(this.orderDetailId, this.orderId)
            .subscribe(
              (entityFromServer) => {
                this.orderDetail = entityFromServer;
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
      product: new FormControl(this.orderDetail?.product, [
        Validators.required,
      ]),
      quantity: new FormControl(this.orderDetail?.quantity, [
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

    this.orderDetail = {
      id: this.orderDetailId,
      product: this.validateForm.get('product')?.value,
      quantity: this.validateForm.get('quantity')?.value,
      orderId: this.orderId,
    };

    try {
      if (this.validateForm.valid) {
        if (this.isCreated) {
          await this.orderDetailService
            .create(this.orderDetail, this.orderId)
            .toPromise();
          this.messageService.success('order detail created successfully!!!');
        }

        if (this.isUpdated) {
          await this.orderDetailService
            .update(this.orderDetailId, this.orderDetail, this.orderId)
            .toPromise();
          this.messageService.success('order detail updated successfully!!!');
        }
        this.validateForm.reset();
        await this.router.navigate([`orders/${this.orderId}/orderDetails`]);
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
      await this.orderDetailService
        .delete(this.orderDetailId, this.orderId)
        .toPromise();
      this.messageService.success('deleted!!!');
      await this.router.navigate([`orders/${this.orderId}/orderDetails`]);
    } catch (e) {
      this.messageService.error(e.message);
    } finally {
      this.isLoading = false;
    }
  }

  onSearchProducts(newProductName: string) {
    this.isLoadingProducts = true;
    this.searchProductsChange$.next(newProductName);
  }

  compareFn = (o1: BaseEntity, o2: BaseEntity) =>
    o1 && o2 ? o1.id === o2.id : o1 === o2;
}
