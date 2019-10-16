import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignedInGuard} from './guards';

const routes: Routes = [
  { path: 'sign-up', loadChildren: 'src/app/modules/sign-up#SignUpModule' },
  { path: 'products', loadChildren: 'src/app/modules/products#ProductsModule', canActivate: [ SignedInGuard ] },
  { path: 'product-scanner', loadChildren: 'src/app/modules/product-scanner#ProductScannerModule', canActivate: [ SignedInGuard ] },
  { path: '', pathMatch: 'full', redirectTo: 'product-scanner' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
