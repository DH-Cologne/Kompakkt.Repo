// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //kompakkt_url: 'https://kompakkt.de/viewer/index.html',
  //express_server_url: 'https://kompakkt.uni-koeln.de',
  kompakkt_url: 'https://local.dev:8100/index.html',
  express_server_url: 'https://local.dev',
  express_server_port: 8080,
  tracking: false,
  tracking_url: '',
  tracking_id: 2,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
