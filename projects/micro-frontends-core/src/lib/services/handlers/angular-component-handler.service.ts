import { Compiler, Injectable, Injector } from '@angular/core';
import {
  App,
  AppInformation,
  AppHandler
} from '@narik/micro-frontends-infrastructure';

@Injectable()
export class AngularComponentHandler extends AppHandler {
  constructor(private compiler: Compiler) {
    super();
  }
  get key(): string {
    return 'angular-component';
  }
  activate(
    app: AppInformation<
      any,
      { type: string; component: string; module?: string },
      any
    >,
    loadedApp: any,
    parameters: { [key: string]: any },
    injector: Injector
  ): Promise<App> {
    if (app.handle.module) {
      return this.compiler
        .compileModuleAsync(loadedApp[app.handle.module])
        .then((moduleFactory) => {
          const moduleRef = moduleFactory.create(injector);
          const component = loadedApp[app.handle.component];
          return moduleRef.componentFactoryResolver.resolveComponentFactory(
            component
          );
        });
    } else return Promise.resolve(loadedApp[app.handle.component]);
  }
}
