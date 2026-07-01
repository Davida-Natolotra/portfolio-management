import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Select } from 'primeng/select';
import { ReportingDataApi } from '../../api/data/reporting-data.api';
import { ReportingMetadataApi } from '../../api/metadata/reporting-metadata.api';
import {
  IPIdentifierListInterface,
  ReportingListItem,
  ReportingPeriod,
} from '../../models/reporting.interface';

@Component({
  selector: 'app-reporting-list',
  imports: [TableModule, CardModule, ButtonModule, DialogModule, Select, ReactiveFormsModule],
  templateUrl: './reporting-list.html',
  styleUrl: './reporting-list.scss',
})
export class ReportingList implements OnInit {
  private dataApi = inject(ReportingDataApi);
  private metadataApi = inject(ReportingMetadataApi);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  reports = signal<ReportingListItem[]>([]);
  periods = signal<ReportingPeriod[]>([]);
  ipIdentifiers = signal<IPIdentifierListInterface[]>([]);
  dialogVisible = signal(false);
  submitting = signal(false);

  periodNames = computed(() => [...new Map(this.periods().map(p => [p.name, p])).values()]);
  periodYears = computed(() => {
    const name = this.form.get('period_name')?.value as string | null;
    const filtered = name ? this.periods().filter(p => p.name === name) : this.periods();
    return [...new Map(filtered.map(p => [p.year, p])).values()];
  });

  form = this.fb.group({
    ip_id: [null as string | null, Validators.required],
    period_name: [null as string | null, Validators.required],
    period_year: [null as number | null, Validators.required],
  });

  ngOnInit(): void {
    this.loadReports();
  }

  openNewReport(): void {
    this.form.reset();
    this.dialogVisible.set(true);
    if (this.periods().length === 0) {
      this.metadataApi.getReportingPeriods().subscribe(p => this.periods.set(p));
    }
    if (this.ipIdentifiers().length === 0) {
      this.dataApi.getIPIdentifiers().subscribe(ips => this.ipIdentifiers.set(ips));
    }
  }

  onPeriodNameChange(): void {
    this.form.get('period_year')?.reset();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { ip_id, period_name, period_year } = this.form.getRawValue();
    const period = this.periods().find(p => p.name === period_name && p.year === period_year);
    if (!period) return;

    this.submitting.set(true);
    this.dataApi.createReporting({ ip_id: ip_id!, report_period: period.id }).subscribe({
      next: item => {
        this.reports.update(list => [item, ...list]);
        this.dialogVisible.set(false);
        this.submitting.set(false);
      },
      error: () => this.submitting.set(false),
    });
  }

  editReport(id: number): void {
    this.router.navigate(['/edit-report', id]);
  }

  private loadReports(): void {
    this.dataApi.getReportingList().subscribe(list => this.reports.set(list));
  }
}
