import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
  declarations: [LoadingIndicatorComponent],
  imports: [CommonModule, NzSpinModule],
  exports: [LoadingIndicatorComponent],
})
export class SharedModule {}
