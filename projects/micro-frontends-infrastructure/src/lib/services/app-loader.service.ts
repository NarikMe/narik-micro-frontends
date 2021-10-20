import { AppInformation } from '../model/app-information';

export abstract class AppLoader {
  abstract get order(): number;
  abstract canLoad(app: AppInformation): boolean;
  abstract load(app: AppInformation): Promise<any>;
}
