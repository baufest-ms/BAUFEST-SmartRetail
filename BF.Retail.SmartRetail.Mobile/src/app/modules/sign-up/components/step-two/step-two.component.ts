import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CameraComponent} from '../../../camera/components';
import {SignUpService} from '../../services';

@Component({
  selector: 'rd-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent implements OnInit {

  photoUrl = null;
  photoTaken = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private signUpService: SignUpService,
  ) { }

  ngOnInit() {
    this.photoUrl = this.signUpService.getStepTwoData().photo;
    this.photoTaken = this.photoUrl != null;
  }

  previous(): void {
    this.router.navigate(['../step-one'], { relativeTo: this.route });
  }

  retry(camera: CameraComponent): void {
    if (this.photoTaken) {
      camera.retry();
      this.photoTaken = false;
    }
  }

  next(): void {
    if (this.photoTaken) {
      this.router.navigate(['../step-three'], { relativeTo: this.route });
    }
  }

  shoot(camera: CameraComponent): void {
    if (!this.photoTaken) {
      camera.shoot();
    }
  }

  photo(blob: Blob): void {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const photo = reader.result as string;
      this.signUpService.setStepTwoData({photo});
      this.photoUrl = photo;
      this.photoTaken = true;
    };
  }
}
