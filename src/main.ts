import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { registerLicense } from '@syncfusion/ej2-base';
// import { environment } from './environments/environment';

// Registering Syncfusion license key
registerLicense('Mgo+DSMBaFt/QHRqVVhkXFpFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF9iS3xbdERhWH1WeXdXQg==;Mgo+DSMBPh8sVXJ0S0J+XE9AdlRDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS3xSdEdrW35ccXZdT2RZVQ==;ORg4AjUWIQA/Gnt2VVhkQlFacl9JXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0dhUX1fcnVXTmlZWUA=;ODM0MjY2QDMyMzAyZTM0MmUzMFRETlk0elljSGxldWtXQllBVFVDSkxrbmJIcXF4THpiS2Q2ZGtIQ3NMY2s9;ODM0MjY3QDMyMzAyZTM0MmUzMG9BYk5leXRnUEE3WTlVL3EvMld0aXFoZ3ROZWsyZ3NnTnBTS0hhcko0UUk9;NRAiBiAaIQQuGjN/V0Z+WE9EaFtCVmJLYVB3WmpQdldgdVRMZVVbQX9PIiBoS35RdERhW3dccXZURGlcUkRy;ODM0MjY5QDMyMzAyZTM0MmUzMFRYcHFzWDMyOXJqdDFXVnQyNGg1MmtPMWVSaWVDQzlGNEdmaEFJNmlnaTQ9;ODM0MjcwQDMyMzAyZTM0MmUzMEh5YisxQ0pLdXFYR1ZDL3J5aTNWRzFKOEtqMEpuVHhiSkFBYzVodEdrZVk9;Mgo+DSMBMAY9C3t2VVhkQlFacl9JXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0dhUX1fcnVXT2FYWEA=;ODM0MjcyQDMyMzAyZTM0MmUzMFFBM2h6Yk9FSmhqVy8yNXJKMGpsWU8rSnFJYWdZSW1wWXVqa3h5TmhsQWM9;ODM0MjczQDMyMzAyZTM0MmUzMEhFVFNUaXZJQWVqNk9aR0N6NTN5cC9ZNFV0MjJmQWRaVFVyR2JYTDRZZjg9;ODM0Mjc0QDMyMzAyZTM0MmUzMFRYcHFzWDMyOXJqdDFXVnQyNGg1MmtPMWVSaWVDQzlGNEdmaEFJNmlnaTQ9');

// if (environment.production) {
  //   enableProdMode();
  // }
  
platformBrowserDynamic().bootstrapModule(AppModule)
.catch(err => console.error(err));