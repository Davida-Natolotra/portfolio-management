import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { IpIdentifierApi } from '../../../../core/api/ip-identifier.api';
import { ReportingDataApi } from '../../../reporting/api/data/reporting-data.api';
import { ReportingListItem } from '../../../reporting/models/reporting.interface';
import { forkJoin } from 'rxjs';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ChartModule } from 'primeng/chart';

interface StatCard {
  label: string;
  value: number | string;
  icon: string;
  color: string;
  bg: string;
}

@Component({
  selector: 'app-dashboard-component',
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    TagModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    ChartModule,
  ],
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

  projects = [
    {
      name: 'Able Pro',
      assignee: 'John Deo',
      role: 'Graphics Designer',
      due: 'Jun, 26',
      priority: 'Low',
      status: 'danger',
    },
    {
      name: 'Dashboard UI',
      assignee: 'Suzen',
      role: 'Web Developer',
      due: 'Jul, 05',
      priority: 'High',
      status: 'success',
    },
    {
      name: 'Landing Page',
      assignee: 'Airi Satou',
      role: 'Marketing',
      due: 'Jul, 20',
      priority: 'Medium',
      status: 'warning',
    },
    {
      name: 'Mobile App',
      assignee: 'Caesar',
      role: 'iOS Dev',
      due: 'Aug, 01',
      priority: 'High',
      status: 'success',
    },
  ];

  salesChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 72, 90, 65, 78, 83, 67, 95],
        fill: true,
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(63,81,181,0.1)',
        tension: 0.4,
      },
      {
        label: 'Revenue',
        data: [28, 48, 40, 19, 86, 60, 75, 50, 60, 70, 55, 80],
        fill: true,
        borderColor: '#00897b',
        backgroundColor: 'rgba(0,137,123,0.08)',
        tension: 0.4,
      },
    ],
  };

  salesChartOptions = {
    plugins: { legend: { position: 'top' } },
    scales: { y: { beginAtZero: true } },
    maintainAspectRatio: false,
  };
  reports = signal<ReportingListItem[]>([]);
  loading = signal(true);
  private ipApi = inject(IpIdentifierApi);
  private reportingApi = inject(ReportingDataApi);

  ngOnInit(): void {
    forkJoin({
      ips: this.ipApi.getAll(),
      reportings: this.reportingApi.getReportingList(),
    }).subscribe(({ ips, reportings }) => {
      this.loading.set(false);
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
