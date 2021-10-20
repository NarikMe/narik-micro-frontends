import { Injectable, Injector, RendererFactory2 } from '@angular/core';
import {
  App, AppHandler, AppInformation
} from '@narik/micro-frontends-infrastructure';

@Injectable()
export class CustomElementHandler extends AppHandler {
  private readonly handlerKey = 'custom-element';
  readonly order = 0;
  constructor(private rendererFactory: RendererFactory2) {
    super();
  }

  canHandle(app: AppInformation): boolean {
    return app.handle.type === this.handlerKey;
  }
  activate(
    app: AppInformation<any, { type: string; elementName: string }, any>,
    loadedApp: any,
    parameters: { [key: string]: any },
    injector: Injector
  ): Promise<App> {
    const renderer = this.rendererFactory.createRenderer(null, null);
    return Promise.resolve(renderer.createElement(app.handle.elementName));
  }
}
