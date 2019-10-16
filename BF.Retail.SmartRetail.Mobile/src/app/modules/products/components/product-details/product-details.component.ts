import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService, PurchasesService, StoreService, ProductsService, ProductDetails, VisualizationsService } from '../../../../services';

@Component({
  selector: 'rd-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  loading = true;
  details: ProductDetails;
  isProductAcquired = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private session: SessionService,
    private purchases: PurchasesService,
    private store: StoreService,
    private products: ProductsService,
    private visualizations: VisualizationsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: { productId: string }) => {
      this.isProductAcquired = this.store.isProductAcquired(params.productId);
      this.getProductDetails(params);
    });
  }

  private setProductVisualization() {
    const { Code: productCode, Id: productId } = this.details;
    const isProductVisualized = this.store.isProductVisualized(productCode);
    if (!isProductVisualized) {
      const visualization = {
        CustomerId: this.session.getCustomer().id,
        ProductId: productId
      };
      this.visualizations.addVisualization(visualization)
        .toPromise()
        .then(() => {
          this.store.visualize(productCode);
        })
        .catch(console.error);
    }
  }

  private getProductDetails(params: { productId: string; }) {
    this.products.getDetails(params.productId)
      .toPromise()
      .then(details => {
        console.log(details);
        this.details = details;
        this.setProductVisualization();
        this.loading = false;
      })
      .catch(exception => {
        console.error(exception);
        this.router.navigate(['../not-found'], { relativeTo: this.route });
      });
  }

  buy(): void {
    const purchase = {
      CustomerId: this.session.getCustomer().id,
      ProductId: this.details.Id
    };
    this.purchases.addPurcharse(purchase)
      .toPromise()
      .then(() => {
        this.store.purchase(this.details.Code);
        this.isProductAcquired = true;
      })
      .catch(console.error);
  }

}
