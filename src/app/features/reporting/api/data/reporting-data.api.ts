import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IPIdentifierListInterface,
  PopDistrictInterface,
  ReportingListItem,
} from '../../models/reporting.interface';
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

  getReportingList(): Observable<ReportingListItem[]> {
    return this.http.get<ReportingListItem[]>(`${this.backendUrl}/reporting/`);
  }

  createReporting(payload: { ip_id: string; report_period: number }): Observable<ReportingListItem> {
    return this.http.post<ReportingListItem>(`${this.backendUrl}/reporting/`, payload);
  }

  getIPIdentifiers(): Observable<IPIdentifierListInterface[]> {
    return this.http.get<IPIdentifierListInterface[]>(`${this.backendUrl}/ip-identifiers/`);
  }

  getFrameworkFundings(): Observable<{ region: string; district: string; technical_area: string }[]> {
    return this.http.get<{ region: string; district: string; technical_area: string }[]>(
      `${this.backendUrl}/framework-funding/`,
    );
  }

  submitFrameworkFunding(payload: Record<string, unknown>): Observable<unknown> {
    return this.http.post(`${this.backendUrl}/framework-funding/`, payload);
  }

  submitStrategicAlignment(payload: Record<string, unknown>): Observable<unknown> {
    return this.http.post(`${this.backendUrl}/strategic-alignment/`, payload);
  }

  submitMonitoringPerformance(payload: Record<string, unknown>): Observable<unknown> {
    return this.http.post(`${this.backendUrl}/monitoring-alignment/`, payload);
  }

  submitQualitativeAnalysis(payload: Record<string, unknown>): Observable<unknown> {
    return this.http.post(`${this.backendUrl}/qualitative-analysis/`, payload);
  }

  submitRiskMatrix(payload: Record<string, unknown>): Observable<unknown> {
    return this.http.post(`${this.backendUrl}/risk-matrix/`, payload);
  }
}
