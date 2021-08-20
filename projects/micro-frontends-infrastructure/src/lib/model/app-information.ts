import { AppMetadata } from './app-metadata';

export interface AppInformation<
  TLoad = {
    [key: string]: any;
  },
  TInitialize = {
    type: string;
    [key: string]: any;
  },
  TMetadata =
    | AppMetadata
    | {
        path: string;
        development?: {
          path: string;
          active: boolean;
        };
      }
> {
  readonly key: string;
  readonly eagerLoad: boolean;
  readonly eagerInitialize: boolean;
  readonly active: boolean;
  readonly isDefault: boolean;
  readonly load: TLoad;
  readonly initialize: TInitialize;
  readonly metadata: TMetadata;
}
