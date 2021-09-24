import { Inject } from '@angular/core';
import {
  AppHandler,
  MicroFrontendsService,
  NavigationOption,
  NavigationService,
  interpolate,
} from '@narik/micro-frontends-infrastructure';

export class NarikMicroFrontendsNavigationService extends NavigationService {
  private templateMatcher: RegExp = /{{\s?([^{}\s]*)\s?}}/g;

  constructor(
    private microFrontendsService: MicroFrontendsService,
    @Inject(AppHandler) private appHandlers: AppHandler[]
  ) {
    super();
  }
  navigate(
    key: string,
    options?: NavigationOption,
    params?: { [key: string]: any }
  ): Promise<any> {
    const matches: {
      appKey: string;
      route: {
        key: string;
        path: string;
      };
    }[] = [];

    options = options ?? {
      target: 'same',
    };
    this.microFrontendsService.appsMetadata.forEach((value, key) => {
      matches.push(
        ...value.routes
          ?.filter((r) => r.key === key)
          .map((r) => ({
            appKey: key,
            route: r,
          }))
      );
    });

    if (matches.length === 0) {
      Promise.reject(`Could not find any route with key ${key}`);
    }
    if (matches.length > 1) {
      Promise.reject(`There are more than one route with key ${key}:`);
    }

    const app = this.microFrontendsService.apps.get(matches[0].appKey)!;
    const handler = this.appHandlers.find((x) => x.key === app?.handle.type);
    if (!handler) {
      throw new Error(`could not found any handler for ${app?.handle.type}`);
    }
    return handler.navigate(
      app,
      interpolate(matches[0].route.path, this.templateMatcher, params),
      options,
      params
    );
  }
}
