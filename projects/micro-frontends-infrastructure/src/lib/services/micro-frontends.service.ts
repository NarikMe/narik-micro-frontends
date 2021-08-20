import { Injector, Provider } from '@angular/core';
import { Observable } from 'rxjs';

export abstract class MicroFrontendsService {
  abstract get injector(): Injector;
  abstract initialize(): Promise<void>;
  abstract loadAndInitializeDefaultApp(rootElement: any): Promise<void>;
  abstract get initializing$(): Observable<boolean>;
  abstract getApp(appKey: string): Promise<any>;
  abstract getApps(extensionPointKey: string): Promise<any[]>;
  abstract getExtensionPoints(
    extensionPointKey: string
  ): { key: string; app: string; title?: string }[];
  abstract addProviders(providers: Provider[]): void;
}
