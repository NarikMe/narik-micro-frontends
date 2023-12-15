import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  AppInformation,
  AppMetadata,
  AppMetadataLoader,
} from '@narik/micro-frontends-infrastructure';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JsonMetadataLoader extends AppMetadataLoader {
  constructor(private http: HttpClient) {
    super();
  }

  loadMetadata(app: AppInformation): Promise<AppMetadata> {
    if (app.metadata) {
      if ('path' in app.metadata || 'development' in app.metadata) {
        const metadata = app.metadata as {
          path: string;
          development?: {
            path: string;
            active: boolean;
          };
        };
        firstValueFrom(
          this.http.get<AppMetadata>(
            metadata.development?.active
              ? metadata.development.path
              : metadata.path
          )
        );
      } else {
        Promise.resolve(app.metadata);
      }
    }
    return Promise.resolve({
      'extension-points': [],
      routes: [],
      apps: [],
    });
  }
}
