import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';

import {
  LucideAngularModule,
  Play,
  Info,
  Bell,
  ChevronLeft,
  ChevronRight,
} from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(
      LucideAngularModule.pick({ Play, Info, Bell, ChevronLeft, ChevronRight })
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
