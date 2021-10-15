import { Type } from '@angular/core';
import {
  AppDiscoverer,
  AppMetadataLoader,
  MicroFrontendsService,
  NavigationService,
} from '@narik/micro-frontends-infrastructure';

export interface CoreOptions {
  appDiscoverer?: Type<AppDiscoverer>;
  appMetadataLoader?: Type<AppMetadataLoader>;
  microFrontendsService?: Type<MicroFrontendsService>;
  navigationService?: Type<NavigationService>;
}
