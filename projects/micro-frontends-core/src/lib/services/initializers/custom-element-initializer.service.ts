import {
  Injectable,
  Injector,
  RendererFactory2,
} from '@angular/core';
import {
  App,
  AppInformation,
  AppInitializer,
} from '@narik/micro-frontends-infrastructure';

@Injectable()
export class CustomElementInitializer extends AppInitializer {
  constructor(private rendererFactory: RendererFactory2) {
    super();
  }
  get key(): string {
    return 'custom-element';
  }
  initialize(
    app: AppInformation<any, { type: string; elementName: string }, any>,
    loadedApp: any,
    parameters: { [key: string]: any },
    injector: Injector
  ): Promise<App> {
    const renderer = this.rendererFactory.createRenderer(null, null);
    return Promise.resolve(renderer.createElement(app.initialize.elementName));
  }
}
