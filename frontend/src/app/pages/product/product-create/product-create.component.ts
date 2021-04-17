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
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product/Product';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent implements OnInit {
  subscription = new Subscription();
  validateForm!: FormGroup;
  isLoading = false;
  product!: Product;
  productId!: number;
  isCreated = false;
  isUpdated = false;
  isDetailed = false;

  constructor(
    private fb: FormBuilder,
    private messageService: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
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
    this.productId = this.activatedRoute.snapshot.params.productId;
  }

  async preparePageContent() {
    const url = this.router.url.split('/');

    switch (url[url.length - 1]) {
      case 'create':
        this.isCreated = true;
        this.product = {
          productName: '',
          productCode: '',
          productPriceIn: undefined,
          productPriceOut: undefined,
          note: '',
          inventory: undefined,
        };
        this.prepareFormCreate();
        break;
      case 'edit':
        this.isUpdated = true;
        this.subscription.add(
          this.productService.getOne(this.productId).subscribe(
            (entityFromServer) => {
              this.product = entityFromServer;
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
          this.productService.getOne(this.productId).subscribe(
            (entityFromServer) => {
              this.product = entityFromServer;
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
      productName: new FormControl(this.product?.productName, [
        Validators.required,
      ]),
      productCode: new FormControl(this.product?.productCode, [
        Validators.required,
      ]),
      productPriceIn: new FormControl(this.product?.productPriceIn, [
        Validators.required,
      ]),
      productPriceOut: new FormControl(this.product?.productPriceOut, [
        Validators.required,
      ]),
      note: new FormControl(this.product?.note),
      quantity: new FormControl(this.product?.inventory?.currentQuantity, [
        Validators.required,
      ]),
    });
  }

  prepareFormUpdateOrDetail() {
    this.validateForm = this.fb.group({
      productName: new FormControl(this.product?.productName, [
        Validators.required,
      ]),
      productCode: new FormControl(this.product?.productCode, [
        Validators.required,
      ]),
      productPriceIn: new FormControl(this.product?.productPriceIn, [
        Validators.required,
      ]),
      productPriceOut: new FormControl(this.product?.productPriceOut, [
        Validators.required,
      ]),
      note: new FormControl(this.product?.note),
      quantity: new FormControl(this.product?.inventory?.currentQuantity, [
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

    this.product = {
      id: this.productId,
      productName: this.validateForm.get('productName')?.value,
      productCode: this.validateForm.get('productCode')?.value,
      productPriceIn: this.validateForm.get('productPriceIn')?.value,
      productPriceOut: this.validateForm.get('productPriceOut')?.value,
      note: this.validateForm.get('note')?.value,
      inventory: { currentQuantity: this.validateForm.get('quantity')?.value },
    };

    try {
      if (this.validateForm.valid) {
        if (this.isCreated) {
          await this.productService.create(this.product).toPromise();
          this.messageService.success('product created successfully!!!');
        }

        if (this.isUpdated) {
          await this.productService
            .update(this.productId, this.product)
            .toPromise();
          this.messageService.success('product updated successfully!!!');
        }
        this.validateForm.reset();
        await this.router.navigate(['products']);
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
      await this.productService.delete(this.productId).toPromise();
      this.messageService.success('deleted!!!');
      await this.router.navigate(['products']);
    } catch (e) {
      this.messageService.error(e.message);
    } finally {
      this.isLoading = false;
    }
  }
}
