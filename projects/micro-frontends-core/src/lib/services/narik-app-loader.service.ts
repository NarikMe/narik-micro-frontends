import {
  loadRemoteEntry,
  loadRemoteModule,
} from '@angular-architects/module-federation';
import { Injectable } from '@angular/core';
import {
  AppInformation,
  AppLoader,
} from '@narik/micro-frontends-infrastructure';

@Injectable()
export class NarikAppLoader extends AppLoader {
  constructor() {
    super();
  }
  load(
    app: AppInformation<{
      remote: {
        key: string;
        entry: string;
        exposedModule: string;
        development?: {
          active: boolean;
          entry: string;
        };
      };
    }>
  ): Promise<any> {
    return loadRemoteEntry(
      app.load.remote.development?.active
        ? app.load.remote.development.entry
        : app.load.remote.entry,
      app.load.remote.key || app.key
    ).then((entry) => {
      return loadRemoteModule({
        remoteName: app.load.remote.key || app.key,
        exposedModule: app.load.remote.exposedModule,
      });
    });
  }
}
