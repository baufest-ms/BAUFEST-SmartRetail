import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  ProductDetailsComponent,
  ProductNotFoundComponent
} from './components';

const routes: Routes = [
  {
    path: 'not-found',
    component: ProductNotFoundComponent,
  },
  {
    path: ':productId',
    component: ProductDetailsComponent,
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
