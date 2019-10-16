import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AddCustomerRequest, CustomersService} from '../../../../services/customers/customers.service';
import {map, tap} from 'rxjs/operators';

export interface StepOneData {
  fullName: string;
  email: string;
}

export interface StepTwoData {
  photo: string;
}

export interface Customer {
  id: number;
  fullName: string;
  email: string;
  photo: string;
}

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  private stepOneData: StepOneData = { fullName: '', email: '' };
  // private stepOneData: StepOneData = { fullName: 'Ignacio Kovacs', email: 'ikovacs@baufest.com' };
  private stepTwoData: StepTwoData = {photo: null};

  constructor(
    private customers: CustomersService
  ) { }

  signUp(): Observable<Customer> {
    const photo = this.stepTwoData.photo;
    const customer: AddCustomerRequest = {
      Fullname: this.stepOneData.fullName,
      Email: this.stepOneData.email,
      Photo: photo.substring('data:image/jpeg;base64,'.length, photo.length)
    };
    return this.customers.addCustomer(customer)
      .pipe(map(response => ({
        id: response.CustomerId,
        fullName: customer.Fullname,
        email: customer.Email,
        photo: customer.Photo
      })), tap(response => {
        console.log('customer (created)', response);
      }));
  }

  setStepOneData(stepOneData: StepOneData): void {
    this.stepOneData = stepOneData;
  }

  getStepOneData(): StepOneData {
    return this.stepOneData;
  }

  setStepTwoData(stepTwoData: StepTwoData): void {
    this.stepTwoData = stepTwoData;
  }

  getStepTwoData(): StepTwoData {
    return this.stepTwoData;
  }
}
