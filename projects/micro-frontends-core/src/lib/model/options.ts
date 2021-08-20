import { Type } from '@angular/core';
import {
  AppDiscoverer,
  AppLoader,
  AppMetadataLoader,
  MicroFrontendsService,
} from '@narik/micro-frontends-infrastructure';

export interface CoreOptions {
  appDiscoverer?: Type<AppDiscoverer>;
  appMetadataLoader?: Type<AppMetadataLoader>;
  microFrontendsService?: Type<MicroFrontendsService>;
  appLoader?: Type<AppLoader>;
}
