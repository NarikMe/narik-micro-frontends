import { AppInformation } from '../model/app-information';

export abstract class AppLoader {
  abstract load(app: AppInformation): Promise<any>;
}
