import {Component, ElementRef, OnDestroy, OnInit, ViewChild, EventEmitter, Output, Input} from '@angular/core';

export const StandardWidthsAndHeights = [
  5120, 4096, 3840, 3440, 3200, 3072, 3000, 2880, 2800, 2736, 2732, 2560,
  2538, 2400, 2304, 2160, 2100, 2048, 2000, 1920, 1856, 1824, 1800, 1792,
  1776, 1728, 1700, 1680, 1600, 1536, 1440, 1400, 1392, 1366, 1344, 1334,
  1280, 1200, 1152, 1136, 1120, 1080, 1050, 1024, 1000, 960, 900, 854, 848,
  832, 800, 768, 750, 720, 640, 624, 600, 576, 544, 540, 512, 480, 320, 240
];

@Component({
  selector: 'rd-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit, OnDestroy {

  @ViewChild('video')
  videoRef: ElementRef;

  video: HTMLVideoElement;

  stream: MediaStream;

  constraints: MediaStreamConstraints;

  loading = true;

  @Input()
  photo: string;

  @Output()
  photoTaken = new EventEmitter<Blob>();

  @Input()
  options: { facingMode: ConstrainDOMString } = { facingMode: { exact: 'user' } };

  constructor() {
  }

  ngOnInit() {
    this.video = this.videoRef.nativeElement;
    const facingMode = this.options.facingMode as ConstrainDOMStringParameters;
    this.constraints = JSON.parse(window.localStorage.getItem(`constraints_${facingMode.exact}`));

    if (this.constraints) {
      console.log(this.constraints);
      this.openCamera(this.constraints);
    } else {
      this.findBestConstraints().then(settings => {
        const constraints = {
          audio: false,
          video: {
            deviceId: settings.deviceId,
            facingMode: settings.facingMode,
            width: { exact: settings.width },
            height: { exact: settings.height }
          }
        };
        console.log(constraints);
        window.localStorage.setItem(`constraints_${facingMode.exact}`, JSON.stringify(constraints));
        this.openCamera(constraints);
      })
      .catch(error => {
        this.options.facingMode = undefined;
        this.findBestConstraints().then(settings => {
          const constraints = {
            audio: false,
            video: {
              deviceId: settings.deviceId,
              facingMode: settings.facingMode,
              width: { exact: settings.width },
              height: { exact: settings.height }
            }
          };
          console.log(constraints);
          window.localStorage.setItem(`constraints_${facingMode.exact}`, JSON.stringify(constraints));
          this.openCamera(constraints);
        });
      });
    }
  }

  private openCamera(constraints): Promise<any> {
   return window.navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        this.stream = stream;
        this.video.srcObject = stream;
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    if (this.video) {
      this.video.pause();
      this.video.srcObject = null;
      this.video.load();
    }
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
  }

  private getSupportedConstraints(): MediaTrackSupportedConstraints {
    return window.navigator.mediaDevices.getSupportedConstraints();
  }

  private findBestConstraints(): Promise<any> {
    return Promise.all([
      this.findBestWidthConstraints(),
      this.findBestHeightConstraints()
    ]).then(results => {
      results.sort((a, b) => a.height > b.height ? -1 : 1);
      return Promise.resolve(results[0]);
    });
  }

  private findBestWidthConstraints(): Promise<any> {
    const widthConstraints: MediaStreamConstraints[] = StandardWidthsAndHeights.map(
      width => ({ audio: false, video: { facingMode: this.options.facingMode, width: { exact: width } } })
    );
    const promises = widthConstraints.map(this.testConstraints);
    const first = promises.shift();
    return promises.reduce((promiseChain, promise) => {
      return promiseChain.catch(() => promise);
    }, first);
  }

  private findBestHeightConstraints(): Promise<any> {
    const heightConstraints: MediaStreamConstraints[] = StandardWidthsAndHeights.map(
      height => ({ audio: false, video: { facingMode: this.options.facingMode, height: { exact: height } } })
    );
    const promises = heightConstraints.map(this.testConstraints);
    const first = promises.shift();
    return promises.reduce((promiseChain, promise) => {
      return promiseChain.catch(() => promise);
    }, first);
  }

  private testConstraints(constraints) {
    return new Promise((resolve, reject) => {
      window.navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
          const settings = stream.getTracks()[0].getSettings();
          stream.getTracks().forEach(track => track.stop());
          resolve(settings);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  public retry(): void {
    // noinspection JSIgnoredPromiseFromCall
    this.video.play();
    this.photo = null;
  }

  public shoot(): void {
    this.video.pause();
    const canvas = document.createElement('canvas');
    canvas.width = this.stream.getTracks()[0].getSettings().width;
    canvas.height = this.stream.getTracks()[0].getSettings().height;
    const context = canvas.getContext('2d');
    context.save();
    context.drawImage(this.video, 0, 0);
    context.restore();
    canvas.toBlob((blob) => {
      this.photoTaken.emit(blob);
    }, 'image/jpeg', .7);
  }

  isFacingModeUser(): boolean {
    return this.constraints && (this.constraints.video as MediaTrackConstraints).facingMode === 'user';
  }
}
