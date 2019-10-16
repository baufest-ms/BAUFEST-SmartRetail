import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomVisionService, Prediction} from '../../../../services/custom-vision/custom-vision.service';
import {CameraComponent} from '../../../camera/components';

@Component({
  selector: 'rd-product-scanner',
  templateUrl: './product-scanner.component.html',
  styleUrls: ['./product-scanner.component.scss']
})
export class ProductScannerComponent implements OnInit {

  @ViewChild('camera')
  camera: CameraComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private customVision: CustomVisionService
  ) { }

  ngOnInit() {
  }

  scan(): void {
    this.camera.shoot();
  }

  photo(image: Blob): void {
    this.customVision.classify(image)
      .toPromise()
      .then(result => {
        console.log(result);
        const product = this.getBestPrediction(result.predictions).tagName;
        this.router.navigate(['../products', product], { relativeTo: this.route });
      })
      .catch(error => {
        console.error(error);
        this.camera.retry();
      });
  }

  getBestPrediction(predictions: Prediction[]): Prediction {
    // TODO preguntar si la mejor siempre viene primera (o hay que ordenar).
    return predictions[0];
  }
}
