import { AppMetadata } from './app-metadata';

export interface AppInformation<
  TLoad = {
    type?: string;
    [key: string]: any;
  },
  THandle = {
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
  readonly active: boolean;
  readonly isDefault: boolean;
  readonly load: TLoad;
  readonly handle: THandle;
  readonly metadata: TMetadata;
}
