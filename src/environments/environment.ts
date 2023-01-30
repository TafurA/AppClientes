// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiPath: 'IntranetSurti/WebServicesSurtiAppRest/',
  url: 'https://intranet.surtilider.com:9001/',
  headerConfig: {
    headers: {
      'Authorization': `Basic U3VydGlBcHA6MzFhNWE1YjAxNDBlMDEzN2UwOGFhZGFhNjBlYjAxNmE0YjQzNDgxMg==`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Headers': "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    }
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Basic U3VydGlBcHA6MzFhNWE1YjAxNDBlMDEzN2UwOGFhZGFhNjBlYjAxNmE0YjQzNDgxMg==`,
    'Content-Type': 'text/plain; charset=utf-8',
    'Access-Control-Allow-Headers': "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
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
