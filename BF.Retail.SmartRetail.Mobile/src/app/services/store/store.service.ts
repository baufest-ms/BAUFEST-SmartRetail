import { Injectable } from '@angular/core';

export interface StoredProductInformation {
  code: string,
  acquired: boolean,
  visualized: boolean
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  isProductAcquired(productCode: string): boolean {
    return this.load(productCode).acquired;
  }

  isProductVisualized(productCode: string): boolean {
    return this.load(productCode).visualized;
  }

  purchase(productCode: string): void {
    const product = this.load(productCode);
    product.acquired = true;
    this.save(product);
  }

  visualize(productCode: string): void {
    const product = this.load(productCode);
    product.visualized = true;
    this.save(product);
  }

  private load(productCode: string): StoredProductInformation {
    const item = window.localStorage.getItem(`product_${productCode.trim().toLowerCase()}`);
    if (item) {
      return JSON.parse(item);
    }
    return {
      code: productCode,
      acquired: false,
      visualized: false
    };
  }

  private save(product: StoredProductInformation): void {
    window.localStorage.setItem(`product_${product.code.trim().toLowerCase()}`, JSON.stringify(product));
  }
}
