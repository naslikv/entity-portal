import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { APP_BASE_HREF, DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { provideLottieOptions } from 'ngx-lottie';
import { requestInterceptor } from './request.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(withInterceptors([requestInterceptor])), provideAnimationsAsync(),
  provideLottieOptions({
    player: () => import('lottie-web'),
  }),{provide: APP_BASE_HREF, useValue: '/portal'}],
};

