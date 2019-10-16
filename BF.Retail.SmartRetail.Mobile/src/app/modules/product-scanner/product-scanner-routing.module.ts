import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductScannerComponent} from './components';

const routes: Routes = [
  { path: '', component: ProductScannerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductScannerRoutingModule { }
