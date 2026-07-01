import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPProfileInterface } from '../../features/reporting/models/reporting.interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class IpIdentifierApi {
  private http = inject(HttpClient);
  private base = `${environment.backendUrl}/ip-identifiers`;

  getAll(): Observable<IPProfileInterface[]> {
    return this.http.get<IPProfileInterface[]>(`${this.base}/`);
  }

  create(payload: Omit<IPProfileInterface, 'id'>): Observable<IPProfileInterface> {
    return this.http.post<IPProfileInterface>(`${this.base}/`, payload);
  }

  update(id: string, payload: Omit<IPProfileInterface, 'id'>): Observable<IPProfileInterface> {
    return this.http.put<IPProfileInterface>(`${this.base}/${id}/`, payload);
  }
}
