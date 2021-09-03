import { CustomElementHandler } from './services/handlers/custom-element-handler.service';
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
import { AngularAppHandler } from './services/handlers/angular-app-handler.service';
import { AngularComponentHandler } from './services/handlers/angular-component-handler.service';
import { AngularRoutingAppHandler } from './services/handlers/angular-routing-app-handler.service';
import { AngularServiceHandler } from './services/handlers/angular-service-handler.service';

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
          useClass: AngularComponentHandler,
          multi: true,
        },
        {
          provide: AppHandler,
          useClass: AngularAppHandler,
          multi: true,
        },
        {
          provide: AppHandler,
          useClass: AngularRoutingAppHandler,
          multi: true,
        },
        {
          provide: AppHandler,
          useClass: AngularServiceHandler,
          multi: true,
        },
        {
          provide: AppHandler,
          useClass: CustomElementHandler,
          multi: true,
        },
      ],
    };
  }
}
