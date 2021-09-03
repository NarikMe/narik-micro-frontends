import {
  Injectable,
  Injector,
  RendererFactory2,
} from '@angular/core';
import {
  App,
  AppInformation,
  AppHandler,
} from '@narik/micro-frontends-infrastructure';

@Injectable()
export class CustomElementHandler extends AppHandler {
  constructor(private rendererFactory: RendererFactory2) {
    super();
  }
  get key(): string {
    return 'custom-element';
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
