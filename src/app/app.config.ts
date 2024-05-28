import { ApplicationConfig } from '@angular/core';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import { provideAnimations} from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loginInterceptor } from './core/interceptors/login.interceptor';



export const appConfig: ApplicationConfig = {
  providers: [
      provideRouter(routes),
      provideHttpClient(withInterceptors([loginInterceptor])),
      provideAnimations()
    ]
};
