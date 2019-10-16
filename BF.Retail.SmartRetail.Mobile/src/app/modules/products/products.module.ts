import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import {
  ProductDetailsComponent,
  ProductNotFoundComponent
} from './components';

@NgModule({
  declarations: [
    ProductDetailsComponent,
    ProductNotFoundComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
