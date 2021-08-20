import { AppInformation } from '../model/app-information';
import { AppMetadata } from '../model/app-metadata';

export abstract class AppMetadataLoader {
  abstract loadMetadata(app: AppInformation): Promise<AppMetadata>;
}
