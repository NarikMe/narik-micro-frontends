import { Compiler, Injectable, Injector } from '@angular/core';
import {
  App,
  AppInformation,
  AppInitializer,
  AppMetadata,
} from '@narik/micro-frontends-infrastructure';

@Injectable()
export class AngularComponentInitializer extends AppInitializer {
  constructor(private compiler: Compiler) {
    super();
  }
  get key(): string {
    return 'angular-component';
  }
  initialize(
    app: AppInformation<
      any,
      { type: string; component: string; module?: string },
      any
    >,
    loadedApp: any,
    parameters: { [key: string]: any },
    injector: Injector
  ): Promise<App> {
    if (app.initialize.module) {
      return this.compiler
        .compileModuleAsync(loadedApp[app.initialize.module])
        .then((moduleFactory) => {
          const moduleRef = moduleFactory.create(injector);
          const component = loadedApp[app.initialize.component];
          return moduleRef.componentFactoryResolver.resolveComponentFactory(
            component
          );
        });
    } else return Promise.resolve(loadedApp[app.initialize.component]);
  }
}
