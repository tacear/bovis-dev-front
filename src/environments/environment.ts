// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlApiBovis: 'https://bovis-api-dev.azurewebsites.net/',
  redirectUri: 'http://localhost:4200/',
  clientID: 'f2a13822-1d07-4f2f-9a78-06ad219b1d03',
  urlAuthority: 'https://login.microsoftonline.com/1c1824e1-a1d5-4bb4-9e3f-5cbbe420b4dc'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
