import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportingEdit } from '../../features/reporting/components/reporting-edit/reporting-edit';

@Component({
  selector: 'app-edit-reporting',
  imports: [ReportingEdit],
  templateUrl: './edit-reporting.html',
  styleUrl: './edit-reporting.scss',
})
export class EditReporting {
  reportingId = inject(ActivatedRoute).snapshot.paramMap.get('id');
}
