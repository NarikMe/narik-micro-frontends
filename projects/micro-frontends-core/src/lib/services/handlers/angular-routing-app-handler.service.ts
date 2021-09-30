import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
  App,
  AppInformation,
  AppHandler,
  AppLoader,
  NavigationOption,
} from '@narik/micro-frontends-infrastructure';

@Injectable()
export class AngularRoutingAppHandler extends AppHandler {
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

  navigate(
    app: Readonly<
      AppInformation<any, { type: string; module: string; path?: string }, any>
    >,
    route: string,
    options: NavigationOption,
    params?: {
      [key: string]: any;
    }
  ): Promise<any> {
    const completeRoutePath = `${app?.handle?.path ?? app?.key}${
      !!route ? '/' + route : ''
    }`;
    if (options.target === 'same') {
      return this.router.navigateByUrl(completeRoutePath, {
        state: params,
      });
    } else if (options.target === 'new-tab') {
      const url = this.router.serializeUrl(
        this.router.createUrlTree([completeRoutePath])
      );
      window.open(url, '_blank');
      return Promise.resolve(true);
    }
    return Promise.reject('not supported');
  }
}
