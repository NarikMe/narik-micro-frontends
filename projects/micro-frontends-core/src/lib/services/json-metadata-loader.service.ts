import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  AppInformation,
  AppMetadata,
  AppMetadataLoader,
  isString,
} from '@narik/micro-frontends-infrastructure';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JsonMetadataLoader extends AppMetadataLoader {
  constructor(private http: HttpClient) {
    super();
  }

  loadMetadata(app: AppInformation): Promise<AppMetadata> {
    if (app.metadata) {
      return 'path' in app.metadata || 'development' in app.metadata
        ? firstValueFrom(
            this.http.get<AppMetadata>(
              app.metadata.development?.active
                ? app.metadata.development.path
                : app.metadata.path
            )
          )
        : Promise.resolve(app.metadata);
    }
    return Promise.resolve({
      'extension-points': [],
      apps: [],
    });
  }
}
