import { Router } from '@angular/router';
import {
  MicroFrontendsService,
  NavigationOption,
  NavigationService,
} from '@narik/micro-frontends-infrastructure';

export class NarikMicroFrontendsNavigationService extends NavigationService {
  /**
   *
   */
  constructor(
    private microFrontendsService: MicroFrontendsService,
    private router: Router
  ) {
    super();
  }
  navigate(
    key: string,
    options?: NavigationOption,
    data?: { [key: string]: any }
  ): Promise<any> {
    const matches: {
      appKey: string;
      route: {
        key: string;
        path: string;
      };
    }[] = [];

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

    switch (options?.target) {
      case 'same': {
        const appInformation = this.microFrontendsService.apps.get(
          matches[0].appKey
        );

        return this.router.navigateByUrl(
          `${appInformation?.handle?.path ?? appInformation?.key}/${
            matches[0].route.path
          }`
        );
      }
      default:
        break;
    }

    return Promise.resolve();
  }
}
