import { Compiler, Injector, ApplicationRef, Injectable } from '@angular/core';
import {
  App,
  AppInformation,
  AppHandler,
} from '@narik/micro-frontends-infrastructure';

@Injectable()
export class AngularAppInitializer extends AppHandler {
  constructor(private compiler: Compiler, private injector: Injector) {
    super();
  }
  get key(): string {
    return 'angular-app';
  }
  activate(
    app: AppInformation<
      any,
      {
        type: string;
        module: string;
        bootstrapComponent: string;
      }
    >,
    loadedApp: any,
    parameters: { [key: string]: any },
    injector: Injector
  ): Promise<App> {
    const applicationRef: ApplicationRef = injector.get(ApplicationRef);
    return this.compiler
      .compileModuleAsync(loadedApp[app.handle.module])
      .then((moduleFactory) => {
        const moduleRef = moduleFactory.create(injector);
        applicationRef.bootstrap(
          loadedApp[app.handle.bootstrapComponent],
          parameters.rootElement
        );
        return {};
      });
  }
}
