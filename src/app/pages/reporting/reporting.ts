import { Component, inject } from '@angular/core';
import { ReportingList } from '../../features/reporting/components/reporting-list/reporting-list';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reporting',
  imports: [ReportingList, ButtonModule],
  templateUrl: './reporting.html',
  styleUrl: './reporting.scss',
})
export class Reporting {
  router = inject(Router);

  gotoEditReport() {
    this.router.navigate(['edit-report']);
  }
}
