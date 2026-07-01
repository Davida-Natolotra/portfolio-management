import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { IpIdentifierApi } from '../../../../core/api/ip-identifier.api';
import { ReportingDataApi } from '../../../reporting/api/data/reporting-data.api';
import { ReportingListItem } from '../../../reporting/models/reporting.interface';
import { forkJoin } from 'rxjs';

interface StatCard {
  label: string;
  value: number | string;
  icon: string;
  color: string;
  bg: string;
}

@Component({
  selector: 'app-dashboard-component',
  imports: [CommonModule, CardModule, TableModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  stats = signal<StatCard[]>([
    { label: 'Registered IP', value: '—', icon: 'pi pi-building', color: '#0033A0', bg: '#e6eaf7' },
    { label: 'Covered Region', value: '—', icon: 'pi pi-map', color: '#CC0000', bg: '#fce8e8' },
    {
      label: 'Covered District',
      value: '—',
      icon: 'pi pi-map-marker',
      color: '#86b410',
      bg: '#e0f0ea',
    },
    {
      label: 'Covered Technical Area',
      value: '—',
      icon: 'pi pi-th-large',
      color: '#D09600FF',
      bg: '#fff1e6',
    },
  ]);
  reports = signal<ReportingListItem[]>([]);
  private ipApi = inject(IpIdentifierApi);
  private reportingApi = inject(ReportingDataApi);

  ngOnInit(): void {
    forkJoin({
      ips: this.ipApi.getAll(),
      reportings: this.reportingApi.getReportingList(),
    }).subscribe(({ ips, reportings }) => {
      this.reports.set(reportings);

      const distinctRegions = new Set(
        reportings.map((r) => r.framework?.region_detail?.id).filter(Boolean),
      ).size;
      const distinctDistricts = new Set(
        reportings.map((r) => r.framework?.district_detail?.id).filter(Boolean),
      ).size;
      const distinctTechnicalAreas = new Set(
        reportings.map((r) => r.framework?.technical_area_detail?.id).filter(Boolean),
      ).size;

      this.stats.set([
        {
          label: 'Registered IP',
          value: ips.length,
          icon: 'pi pi-building',
          color: '#0033A0',
          bg: '#e6eaf7',
        },
        {
          label: 'Covered Region',
          value: distinctRegions,
          icon: 'pi pi-map',
          color: '#CC0000',
          bg: '#fce8e8',
        },
        {
          label: 'Covered District',
          value: distinctDistricts,
          icon: 'pi pi-map-marker',
          color: '#86b410',
          bg: '#e0f0ea',
        },
        {
          label: 'Covered Technical Area',
          value: distinctTechnicalAreas,
          icon: 'pi pi-th-large',
          color: '#d09600',
          bg: '#fff1e6',
        },
      ]);
    });
  }
}
