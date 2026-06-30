import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  action_status,
  activity_status,
  AFGHealthStrategyInterface,
  AreaCoopInterface,
  DataSourceIndicatorsInterface,
  OrganisationUnitInterface,
  PerformanceIndicatorsInterface,
  SensInterface,
  TechnicalAreaInterface
} from '../../models/reporting.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ReportingMetadataApi {
  http = inject(HttpClient);
  backendUrl = environment.backendUrl;

  getRegion(): Observable<OrganisationUnitInterface[]> {
    return this.http.get<OrganisationUnitInterface[]>(`${this.backendUrl}/metadata/region`);
  }

  getDistrict(regionId: string) {
    return this.http.get<OrganisationUnitInterface[]>(`${this.backendUrl}/metadata/district/${regionId}`);
  }

  getTechnicalArea(): Observable<TechnicalAreaInterface[]> {
    return this.http.get<TechnicalAreaInterface[]>(`${this.backendUrl}/metadata/technicalArea`);
  }

  getAreaOfCooperation(): Observable<AreaCoopInterface[]> {
    return this.http.get<AreaCoopInterface[]>(`${this.backendUrl}/metadata/areaOfCooperation`);
  }

  getTypeOfContribution(areaOfCooperationId: string): Observable<AreaCoopInterface[]> {
    return this.http.get<AreaCoopInterface[]>(`${this.backendUrl}/metadata/areaOfCooperation/${areaOfCooperationId}/subAreas`);
  }

  getAFGHealthStrategy(): Observable<AFGHealthStrategyInterface[]> {
    return this.http.get<AFGHealthStrategyInterface[]>(
      `${this.backendUrl}/metadata/afgHealthStrategy`,
    );
  }

  getMOUIndicators(): Observable<PerformanceIndicatorsInterface[]> {
    return this.http.get<PerformanceIndicatorsInterface[]>(
      `${this.backendUrl}/metadata/indicators`,
    );
  }

  getDataSourceIndicator(): Observable<DataSourceIndicatorsInterface[]> {
    return this.http.get<DataSourceIndicatorsInterface[]>(
      `${this.backendUrl}/metadata/dataSource`,
    );
  }

  getSensList(): Observable<SensInterface[]> {
    return this.http.get<SensInterface[]>(`${this.backendUrl}/metadata/sens`);
  }

  getActionStatusList(): Observable<action_status[]> {
    return this.http.get<action_status[]>(`${this.backendUrl}/metadata/actionstatus`);
  }

  getActivityStatusList(): Observable<activity_status[]> {
    return this.http.get<activity_status[]>(`${this.backendUrl}/metadata/activitystatus`);
  }

  getList15(): Observable<Number[]> {
    return this.http.get<number[]>(`${this.backendUrl}/metadata/list15`);
  }
}
