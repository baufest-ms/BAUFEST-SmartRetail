import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductScannerRoutingModule} from './product-scanner-routing.module';
import {ProductScannerComponent} from './components';
import {CameraModule} from '../camera';

@NgModule({
  declarations: [
    ProductScannerComponent
  ],
  imports: [
    CommonModule,
    CameraModule,
    ProductScannerRoutingModule,
  ]
})
export class ProductScannerModule { }
