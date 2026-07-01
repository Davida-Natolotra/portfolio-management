import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ip-profile',
  imports: [],
  templateUrl: './ip-profile.html',
  styleUrl: './ip-profile.scss',
})
export class IpProfile {
  fb = inject(FormBuilder);

  ipForm = this.fb.group({
    ip_name: ['', Validators.required],
    activity_name: ['', Validators.required],
    description: ['', Validators.required],
    main_activities: ['', Validators.required],
    period: ['', Validators.required],
    budget: [0, Validators.required],
    donor: ['', Validators.required],
    version: ['', Validators.required],
  });
}
