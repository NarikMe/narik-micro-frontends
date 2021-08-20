import { Injector } from '@angular/core';
import { App } from '../interface/app';
import { AppInformation } from '../model/app-information';

export abstract class AppInitializer {
  abstract get key(): string;
  abstract initialize(
    app: AppInformation,
    loadedApp: any,
    parameters: { [key: string]: any },
    injector: Injector
  ): Promise<App>;
}
