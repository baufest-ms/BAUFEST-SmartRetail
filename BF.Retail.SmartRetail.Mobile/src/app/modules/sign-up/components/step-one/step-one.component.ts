import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {SignUpService} from '../../services';

@Component({
  selector: 'rd-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent implements OnInit {

  signUpForm = new FormGroup({
    fullName: new FormControl('', Validators.compose([
      Validators.required,
    ])),
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ]))
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private signUpService: SignUpService
  ) { }

  ngOnInit() {
    this.signUpForm.setValue(this.signUpService.getStepOneData());
  }

  siguiente(): void {
    if (this.signUpForm.valid) {
      this.signUpService.setStepOneData(this.signUpForm.value);
      this.router.navigate(['../step-two'], { relativeTo: this.route });
    } else {
      Object.keys(this.signUpForm.controls).forEach(control => {
        this.signUpForm.controls[control].markAsDirty({onlySelf: true});
      });
    }
  }

  isInvalid(abstractControl: AbstractControl): boolean {
    return (abstractControl.touched || abstractControl.dirty)
      && abstractControl.invalid;
  }
}
