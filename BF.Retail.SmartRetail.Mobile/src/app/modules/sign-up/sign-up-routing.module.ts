import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignUpComponent, StepOneComponent, StepThreeComponent, StepTwoComponent} from './components';

const routes: Routes = [
  {
    path: '',
    component: SignUpComponent,
    children: [
      { path: 'step-one', component: StepOneComponent },
      { path: 'step-two', component: StepTwoComponent },
      { path: 'step-three', component: StepThreeComponent },
      { path: '', pathMatch: 'full', redirectTo: 'step-one' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpRoutingModule { }
