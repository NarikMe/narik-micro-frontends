import { AppInformation } from '../model/app-information';

export abstract class AppLoader {
  abstract get key(): string;
  abstract load(app: AppInformation): Promise<any>;
}
