import {
  loadRemoteEntry,
  loadRemoteModule,
} from '@angular-architects/module-federation';
import { Injectable } from '@angular/core';
import {
  AppInformation,
  AppLoader,
  AppMetadata,
} from '@narik/micro-frontends-infrastructure';

@Injectable()
export class NarikModuleFederationAppLoader extends AppLoader {
  private readonly loaderKey = 'module-federation';
  readonly order = 0;
  constructor() {
    super();
  }

  canLoad(
    app: AppInformation<{ [key: string]: any; type?: string }, any, any>
  ): boolean {
    return !app.load.type || app.load.type === this.loaderKey;
  }

  load(
    app: AppInformation<{
      remote: {
        key: string;
        entry: string;
        exposedModule: string;
        type?: 'script' | 'script';
        development?: {
          active: boolean;
          entry: string;
        };
      };
    }>
  ): Promise<any> {
    const remoteEntry = app.load.remote.development?.active
      ? app.load.remote.development.entry
      : app.load.remote.entry;

    if (app.load.remote.type !== 'script') {
      return loadRemoteEntry({
        type: 'module',
        remoteEntry: remoteEntry,
      }).then((entry) => {
        return loadRemoteModule({
          type: 'module',
          remoteEntry: remoteEntry,
          exposedModule: app.load.remote.exposedModule,
        });
      });
    }
    return loadRemoteEntry(remoteEntry, app.load.remote.key || app.key).then(
      (entry) => {
        return loadRemoteModule({
          remoteName: app.load.remote.key || app.key,
          exposedModule: app.load.remote.exposedModule,
        });
      }
    );
  }
}
