import { CustomElementInitializer } from './services/handlers/custom-element-handler.service';
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
import { AppHandler } from '@narik/micro-frontends-infrastructure';
import { AngularAppInitializer } from './services/handlers/angular-app-handler.service';
import { AngularComponentInitializer } from './services/handlers/angular-component-handler.service';
import { AngularRoutingAppInitializer } from './services/handlers/angular-routing-app-handler.service';
import { AngularServiceInitializer } from './services/handlers/angular-service-handler.service';

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
          provide: AppHandler,
          useClass: AngularComponentInitializer,
          multi: true,
        },
        {
          provide: AppHandler,
          useClass: AngularAppInitializer,
          multi: true,
        },
        {
          provide: AppHandler,
          useClass: AngularRoutingAppInitializer,
          multi: true,
        },
        {
          provide: AppHandler,
          useClass: AngularServiceInitializer,
          multi: true,
        },
        {
          provide: AppHandler,
          useClass: CustomElementInitializer,
          multi: true,
        },
      ],
    };
  }
}
