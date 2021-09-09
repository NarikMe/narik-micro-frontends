import { VueAppHandler } from './vue-app-handler.service';
import { AppHandler } from '@narik/micro-frontends-infrastructure';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { VueAppHostComponent } from './vue-app-host/vue-app-host.component';

@NgModule({
  declarations: [VueAppHostComponent],
  imports: [],
  exports: [VueAppHostComponent],
})
export class MicroFrontendsVueHandlersModule {
  static forRoot(): ModuleWithProviders<MicroFrontendsVueHandlersModule> {
    return {
      ngModule: MicroFrontendsVueHandlersModule,
      providers: [
        {
          provide: AppHandler,
          useClass: VueAppHandler,
          multi: true,
        },
      ],
    };
  }
}
