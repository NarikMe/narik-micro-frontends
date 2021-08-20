import { AppInformation } from './app-information';

export interface AppMetadata {
  apps: AppInformation[];
  ['extension-points']: { key: string; app: string; title?: string }[];
}
