import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

export interface AddCustomerRequest {
  Fullname: string;
  Email: string;
  Photo: string;
}

export interface AddCustomerResponse {
  CustomerId: number;
}


@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private httpClient: HttpClient) { }

  addCustomer(customer: AddCustomerRequest): Observable<AddCustomerResponse> {
    const url = environment.baseUrl + '/Customers';
    return this.httpClient.post<AddCustomerResponse>(url, customer);
  }
}
