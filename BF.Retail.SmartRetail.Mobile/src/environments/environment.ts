// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: '',
  customVision: {
    // tslint:disable-next-line:max-line-length
    baseUrl: '',
    // tslint:disable-next-line: max-line-length
    // baseUrl: 'https://eastus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/c41d0054-27e5-4bd3-95b5-e88d294a9437/classify/iterations/Iteration1',
    predictionKey: ''
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
