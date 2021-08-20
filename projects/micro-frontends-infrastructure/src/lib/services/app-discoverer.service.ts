import { AppInformation } from '../model/app-information';

export abstract class AppDiscoverer {
  abstract DiscoverApps(): Promise<AppInformation[]>;
}
