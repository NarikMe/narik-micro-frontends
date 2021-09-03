import { Compiler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
  App,
  AppInformation,
  AppHandler,
  AppLoader,
  AppMetadata,
} from '@narik/micro-frontends-infrastructure';

@Injectable()
export class AngularRoutingAppInitializer extends AppHandler {
  constructor(private router: Router, private appLoader: AppLoader) {
    super();
  }
  get key(): string {
    return 'angular-routing-app';
  }
  initialize(
    app: AppInformation<
      any,
      { type: string; module: string; path?: string },
      any
    >,
    loadedApp: any,
    parameters: { [key: string]: any },
    injector: Injector
  ): Promise<App> {
    this.router.config.push({
      path: app.handle.path ?? app.key,
      loadChildren: () => {
        return this.appLoader.load(app).then((m) => m[app.handle.module]);
      },
    });
    return Promise.resolve({});
  }
}
