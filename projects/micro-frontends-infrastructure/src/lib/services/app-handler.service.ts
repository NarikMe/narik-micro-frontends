import { NavigationOption } from './../model/navigation-option';
import { Injector } from '@angular/core';
import { App } from '../interface/app';
import { AppInformation } from '../model/app-information';

export abstract class AppHandler {
  abstract get order(): number;
  abstract canHandle(app: AppInformation): boolean;
  initialize(
    app: AppInformation,
    loadedApp: any,
    parameters: { [key: string]: any },
    injector: Injector
  ): Promise<App> {
    return Promise.resolve(app);
  }
  activate(
    app: AppInformation,
    loadedApp: any,
    parameters: { [key: string]: any },
    injector: Injector
  ): Promise<App> {
    return Promise.resolve(loadedApp);
  }
  navigate(
    app: Readonly<AppInformation>,
    route: string,
    option: NavigationOption,
    params?: { [key: string]: any }
  ): Promise<any> {
    return Promise.reject(
      `navigation is not supported for this type:${app.handle}`
    );
  }
}
