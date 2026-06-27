import { Component } from '@angular/core';
import { ReportingList } from '../../features/reporting/components/reporting-list/reporting-list';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-reporting',
  imports: [ReportingList, ButtonModule],
  templateUrl: './reporting.html',
  styleUrl: './reporting.scss',
})
export class Reporting {}
