import { AppInformation } from '../model/app-information';

export abstract class AppDiscoverer {
  abstract discoverApps(): Promise<AppInformation[]>;
}
