import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { SignUpRoutingModule } from './sign-up-routing.module';
import {SignUpComponent, StepOneComponent, StepThreeComponent, StepTwoComponent} from './components';
import {CameraModule} from '../camera';

@NgModule({
  declarations: [
    SignUpComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    CameraModule,
    SignUpRoutingModule
  ]
})
export class SignUpModule { }
