import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SessionService} from '../../../../services';
import {SignUpService} from '../../services';
import {Subscription} from 'rxjs';

@Component({
  selector: 'rd-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss']
})
export class StepThreeComponent implements OnInit, OnDestroy {

  loading = true;
  error = false;
  emailAlreadyRegistered = false;

  private signUpSub: Subscription;

  constructor(
    private router: Router,
    private session: SessionService,
    private signUpService: SignUpService,
  ) { }

  ngOnInit() {
    this.signUp();
  }

  ngOnDestroy() {
    if (this.signUpSub && !this.signUpSub.closed) {
      this.signUpSub.unsubscribe();
    }
  }

  signUp(): void {
    this.error = false;
    this.loading = true;
    this.signUpSub = this.signUpService.signUp()
      .subscribe(customer => {
        this.session.setCustomer(customer);
        this.loading = false;
        this.signUpSub.unsubscribe();
      }, response => {
        console.error(response);
        this.emailAlreadyRegistered = response.status === 409;
        this.loading = false;
        this.error = true;
        this.signUpSub.unsubscribe();
      });
  }

  retry(): void {
    this.signUp();
  }

  finish(): void {
    this.router.navigate(['/'], {replaceUrl: true});
  }
}
