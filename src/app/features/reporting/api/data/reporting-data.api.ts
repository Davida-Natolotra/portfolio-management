import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PopDistrictInterface } from '../../models/reporting.interface';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportingDataApi {
  http = inject(HttpClient);
  backendUrl = environment.backendUrl;

  getPopulationDistrict(districtId: string): Observable<PopDistrictInterface> {
    return this.http.get<PopDistrictInterface>(`${this.backendUrl}/populations/district/${districtId}`);
  }
}
