import { CustomElementInitializer } from './services/initializers/custom-element-initializer.service';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  AppDiscoverer,
  AppLoader,
  AppMetadataLoader,
  MicroFrontendsService,
} from '@narik/micro-frontends-infrastructure';
import { CoreOptions } from './model/options';
import { JsonMetadataLoader } from './services/json-metadata-loader.service';
import { JsonAppDiscoverer } from './services/json-app-discoverer.service';
import { NarikMicroFrontendsService } from './services/narik-micro-frontends.service';
import { NarikAppLoader } from './services/narik-app-loader.service';
import { AppInitializer } from '@narik/micro-frontends-infrastructure';
import { AngularAppInitializer } from './services/initializers/angular-app-initializer.service';
import { AngularComponentInitializer } from './services/initializers/angular-component-initializer.service';
import { AngularRoutingAppInitializer } from './services/initializers/angular-routing-app-initializer.service';
import { AngularServiceInitializer } from './services/initializers/angular-service-initializer.service';

@NgModule({})
export class MicroFrontendsCoreModule {
  static forRoot(
    options?: CoreOptions
  ): ModuleWithProviders<MicroFrontendsCoreModule> {
    return {
      ngModule: MicroFrontendsCoreModule,
      providers: [
        {
          provide: MicroFrontendsService,
          useClass:
            options?.microFrontendsService || NarikMicroFrontendsService,
        },
        {
          provide: AppMetadataLoader,
          useClass: options?.appMetadataLoader || JsonMetadataLoader,
        },
        {
          provide: AppDiscoverer,
          useClass: options?.appDiscoverer || JsonAppDiscoverer,
        },
        {
          provide: AppLoader,
          useClass: options?.appLoader || NarikAppLoader,
        },
        {
          provide: AppInitializer,
          useClass: AngularComponentInitializer,
          multi: true,
        },
        {
          provide: AppInitializer,
          useClass: AngularAppInitializer,
          multi: true,
        },
        {
          provide: AppInitializer,
          useClass: AngularRoutingAppInitializer,
          multi: true,
        },
        {
          provide: AppInitializer,
          useClass: AngularServiceInitializer,
          multi: true,
        },
        {
          provide: AppInitializer,
          useClass: CustomElementInitializer,
          multi: true,
        },
      ],
    };
  }
}
