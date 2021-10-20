import { ApplicationRef, Compiler, Injectable, Injector } from '@angular/core';
import {
  App, AppHandler, AppInformation
} from '@narik/micro-frontends-infrastructure';

@Injectable()
export class AngularAppHandler extends AppHandler {
  private readonly handlerKey = 'angular-app';
  readonly order = 0;
  constructor(private compiler: Compiler, private injector: Injector) {
    super();
  }

  canHandle(app: AppInformation): boolean {
    return app.handle.type === this.handlerKey;
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
