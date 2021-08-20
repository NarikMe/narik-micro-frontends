import { Compiler, Injector, ApplicationRef, Injectable } from '@angular/core';
import {
  App,
  AppInformation,
  AppInitializer,
} from '@narik/micro-frontends-infrastructure';

@Injectable()
export class AngularAppInitializer extends AppInitializer {
  constructor(private compiler: Compiler, private injector: Injector) {
    super();
  }
  get key(): string {
    return 'angular-app';
  }
  initialize(
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
      .compileModuleAsync(loadedApp[app.initialize.module])
      .then((moduleFactory) => {
        const moduleRef = moduleFactory.create(injector);
        applicationRef.bootstrap(
          loadedApp[app.initialize.bootstrapComponent],
          parameters.rootElement
        );
        return {};
      });
  }
}
