import { Injectable, Injector } from '@angular/core';
import {
  App, AppHandler, AppInformation, MicroFrontendsService
} from '@narik/micro-frontends-infrastructure';

@Injectable()
export class AngularServiceHandler extends AppHandler {
  private readonly handlerKey = 'angular-service';
  readonly order = 0;
  constructor(private injector: Injector) {
    super();
  }

  canHandle(app: AppInformation): boolean {
    return app.handle.type === this.handlerKey;
  }
  initialize(
    app: AppInformation<any, { type: string; providers: string }, any>,
    loadedApp: any,
    parameters: { [key: string]: any },
    injector: Injector
  ): Promise<App> {
    const frontEndService = this.injector.get(MicroFrontendsService);
    frontEndService.addProviders(loadedApp[app.handle.providers ?? []]);
    return Promise.resolve({});
  }
}
