import { Inject, Injector, Provider, StaticProvider } from '@angular/core';
import { Injectable } from '@angular/core';
import {
  App,
  AppDiscoverer,
  AppInformation,
  AppHandler,
  AppLoader,
  AppMetadata,
  AppMetadataLoader,
  MicroFrontendsService,
} from '@narik/micro-frontends-infrastructure';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class NarikMicroFrontendsService extends MicroFrontendsService {
  private _injector?: Injector;
  private providers: Provider[] = [];
  private initialized = false;
  private apps: Map<string, AppInformation> = new Map<string, AppInformation>();
  private appsMetadata: Map<string, AppMetadata> = new Map<
    string,
    AppMetadata
  >();
  private initializing: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    private defaultInjector: Injector,
    private appDiscoverer: AppDiscoverer,
    private appMetadataLoader: AppMetadataLoader,
    private appLoader: AppLoader,
    @Inject(AppHandler) private appInitializers: AppHandler[]
  ) {
    super();
  }

  get initializing$(): Observable<boolean> {
    return this.initializing.asObservable();
  }

  get injector(): Injector {
    return this._injector ?? this.defaultInjector;
  }

  async loadAndInitializeDefaultApp(rootElement: any): Promise<void> {
    const defaultApp = this.apps.valuesArray().find((app) => app.isDefault);
    if (!defaultApp) {
      throw new Error('there is no default in apps');
    }
    await this.appLoader.load(defaultApp).then((loadedApp: any) => {
      return this.initApp(defaultApp, loadedApp, {
        rootElement,
      });
    });
  }
  async initialize(): Promise<void> {
    this.initializing.next(true);

    await this.appDiscoverer.DiscoverApps().then((apps: AppInformation[]) => {
      return this.populateApps(apps.filter((a) => a.active ?? true)).then(
        () => {
          return Promise.all(
            this.apps.valuesArray().map((app) => {
              if (app.eagerLoad) {
                return this.appLoader.load(app).then((loadedApp) => {
                  return app.eagerInitialize
                    ? (this.initApp(app, loadedApp) as Promise<unknown>)
                    : Promise.resolve();
                });
              } else if (app.eagerInitialize) {
                return this.initApp(app) as Promise<unknown>;
              }
              return Promise.resolve();
            })
          );
        }
      );
    });
    this._injector = Injector.create({
      providers: this.providers as StaticProvider[],
      parent: this.defaultInjector,
    });
    this.initialized = true;
    this.initializing.next(false);
  }

  protected initApp(
    app: AppInformation,
    loadedApp?: any,
    parameters?: { [key: string]: any }
  ): Promise<App> {
    const initializer = this.appInitializers.find(
      (x) => x.key === app.initialize.type
    );
    if (!initializer) {
      throw new Error(
        `could not found any initializer for ${app.initialize.type}`
      );
    }
    return initializer.initialize(
      app,
      loadedApp,
      parameters || {},
      this.injector
    );
  }

  protected async populateApps(apps: AppInformation[]): Promise<void> {
    if (apps.length) {
      for (const app of apps) {
        this.apps.set(app.key, app);
      }
      return Promise.all(
        apps.map((app) =>
          this.appMetadataLoader.loadMetadata(app).then((meta) => {
            return {
              meta,
              app,
            };
          })
        )
      ).then((metadata: { app: AppInformation; meta: AppMetadata }[]) => {
        for (const meta of metadata) {
          this.appsMetadata.set(meta.app.key, meta.meta);
        }
        return this.populateApps(
          metadata
            .map((m) => m.meta.apps || [])
            .flat()
            .filter((app) => app.active ?? true)
        );
      });
    }
  }

  async getApp(appKey: string): Promise<any> {
    if (!this.initialized) {
      throw new Error('not initialized');
    }
    const app = this.apps.get(appKey);
    if (!app) {
      throw new Error(`could not find any app with key:${appKey}`);
    }
    return this.appLoader.load(app).then((loadedApp: any) => {
      return this.initApp(app, loadedApp);
    });
  }

  async getApps(extensionPointKey: string): Promise<any[]> {
    const appKeys: string[] = this.getExtensionPoints(extensionPointKey).map(
      (x) => x.app
    );
    return Promise.all(appKeys.map((app) => this.getApp(app)));
  }
  getExtensionPoints(
    extensionPointKey: string
  ): { key: string; app: string; title?: string }[] {
    const appKeys: { key: string; app: string; title?: string }[] = [];
    this.appsMetadata.forEach((value) => {
      appKeys.push(
        ...value['extension-points']
          .filter((ex) => ex.key === extensionPointKey)
          .flat()
      );
    });
    return appKeys;
  }

  addProviders(providers: Provider[]): void {
    if (this.initialized) {
      throw new Error('could not add providers after initialized');
    }
    this.providers.push(...providers);
  }
}
