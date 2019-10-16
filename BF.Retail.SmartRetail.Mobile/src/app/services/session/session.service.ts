import {Injectable} from '@angular/core';
import {Customer} from '../../modules/sign-up/services';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private customer: Customer;

  constructor() { }

  setCustomer(customer: Customer): void {
    window.localStorage.setItem('customer', JSON.stringify(customer));
    this.customer = customer;
  }

  getCustomer(): Customer {
    if (!this.customer) {
      this.customer = JSON.parse(window.localStorage.getItem('customer'));
    }
    return this.customer;
  }

  isSignedIn(): boolean {
    return this.getCustomer() !== undefined && this.getCustomer() !== null;
  }
}
