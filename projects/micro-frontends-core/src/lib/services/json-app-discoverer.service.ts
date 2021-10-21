import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AppDiscoverer,
  AppInformation,
} from '@narik/micro-frontends-infrastructure';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JsonAppDiscoverer extends AppDiscoverer {
  constructor(private http: HttpClient) {
    super();
  }
  discoverApps(): Promise<AppInformation[]> {
    return firstValueFrom(
      this.http.get<AppInformation[]>(`assets/apps.json`)
    );
  }
}
