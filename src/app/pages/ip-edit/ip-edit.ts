import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { DatePicker } from 'primeng/datepicker';
import { Textarea } from 'primeng/textarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { IpIdentifierApi } from '../../core/api/ip-identifier.api';

@Component({
  selector: 'app-ip-edit',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    InputNumber,
    DatePicker,
    Textarea,
    ProgressSpinnerModule,
  ],
  templateUrl: './ip-edit.html',
  styleUrl: './ip-edit.scss',
})
export class IpEdit implements OnInit {
  private api = inject(IpIdentifierApi);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  editId = signal<string | null>(null);
  submitting = signal(false);
  loading = signal(false);

  form = this.fb.group({
    ip_name: ['', [Validators.required, Validators.maxLength(50)]],
    activity_name: ['', Validators.required],
    description: ['', Validators.required],
    period_start: [null as Date | null, Validators.required],
    period_end: [null as Date | null, Validators.required],
    budget: [null as number | null, [Validators.required, Validators.min(0)]],
    donor: ['', [Validators.required, Validators.maxLength(50)]],
    version: [null as Date | null, Validators.required],
  });

  get isEdit(): boolean {
    return !!this.editId();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editId.set(id);
      this.loading.set(true);
      this.api.getAll().subscribe(list => {
        this.loading.set(false);
        const ip = list.find(i => i.id === id);
        if (ip) {
          this.form.patchValue({
            ip_name: ip.ip_name,
            activity_name: ip.activity_name,
            description: ip.description,
            period_start: ip.period_start ? new Date(ip.period_start) : null,
            period_end: ip.period_end ? new Date(ip.period_end) : null,
            budget: ip.budget,
            donor: ip.donor,
            version: ip.version ? new Date(ip.version) : null,
          });
        }
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.getRawValue();
    const payload = {
      ip_name: raw.ip_name!,
      activity_name: raw.activity_name!,
      description: raw.description!,
      period_start: this.formatDate(raw.period_start!),
      period_end: this.formatDate(raw.period_end!),
      budget: raw.budget!,
      donor: raw.donor!,
      version: this.formatDate(raw.version!),
    };

    this.submitting.set(true);
    const req = this.isEdit
      ? this.api.update(this.editId()!, payload)
      : this.api.create(payload);

    req.subscribe({
      next: () => this.router.navigate(['/ip-list']),
      error: () => this.submitting.set(false),
    });
  }

  cancel(): void {
    this.router.navigate(['/ip-list']);
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
