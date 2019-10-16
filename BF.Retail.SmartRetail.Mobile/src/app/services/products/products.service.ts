import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ProductDetails {
  Id: number;
  Code: string;
  Description: string;
  Price: number;
  Name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  getDetails(productId: string): Observable<ProductDetails> {
    const url = environment.baseUrl + '/Products';
    const params = new HttpParams()
      .append('code', productId);
    return this.httpClient.get<ProductDetails>(url, { params });
  }
}
