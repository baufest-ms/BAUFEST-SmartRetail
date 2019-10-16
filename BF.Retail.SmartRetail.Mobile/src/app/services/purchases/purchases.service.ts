import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

export interface AddPurchaseRequest {
  CustomerId: number;
  ProductId: number;
}

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  constructor(private httpClient: HttpClient) { }

  addPurcharse(purchase: AddPurchaseRequest): Observable<void> {
    const url = environment.baseUrl + '/Purchases';
    return this.httpClient.post<void>(url, purchase);
  }
}
