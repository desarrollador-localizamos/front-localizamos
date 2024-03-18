import { ApplicationConfig } from '@angular/core';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import { provideAnimations} from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), provideAnimations()]
};
