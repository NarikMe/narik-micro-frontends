import { Injector } from '@angular/core';
import { App } from '../interface/app';
import { AppInformation } from '../model/app-information';

export abstract class AppHandler {
  abstract get key(): string;
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
    return Promise.resolve(app);
  }
}
