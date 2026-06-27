import { Component } from '@angular/core';
import { ReportingList } from '../../features/reporting/components/reporting-list/reporting-list';
import { ReportingEdit } from '../../features/reporting/components/reporting-edit/reporting-edit';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-reporting',
  imports: [ReportingList, ReportingEdit, ButtonModule],
  templateUrl: './reporting.html',
  styleUrl: './reporting.scss',
})
export class Reporting {}
