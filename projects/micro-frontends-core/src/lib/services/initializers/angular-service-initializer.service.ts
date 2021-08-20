import { Injectable, Injector } from '@angular/core';
import {
  App,
  AppInformation,
  AppInitializer,
  MicroFrontendsService,
} from '@narik/micro-frontends-infrastructure';

@Injectable()
export class AngularServiceInitializer extends AppInitializer {
  constructor(private injector: Injector) {
    super();
  }
  get key(): string {
    return 'angular-service';
  }
  initialize(
    app: AppInformation<any, { type: string; providers: string }, any>,
    loadedApp: any,
    parameters: { [key: string]: any },
    injector: Injector
  ): Promise<App> {
    const frontEndService = this.injector.get(MicroFrontendsService);
    frontEndService.addProviders(loadedApp[app.initialize.providers ?? []]);
    return Promise.resolve({});
  }
}