// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  initialLon: 11.1722,
  initialLat: 43.5599,
  endpoint: 'http://localhost:8081',
  urlWMS:  'http://www502.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmsofc',
  paramWMS: 'rt_ofc.10k13'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
