import { Component, inject, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { IpIdentifierApi } from '../../core/api/ip-identifier.api';
import { IPProfileInterface } from '../../features/reporting/models/reporting.interface';

@Component({
  selector: 'app-ip-list',
  imports: [TableModule, CardModule, ButtonModule, DecimalPipe],
  templateUrl: './ip-list.html',
  styleUrl: './ip-list.scss',
})
export class IpList implements OnInit {
  private api = inject(IpIdentifierApi);
  private router = inject(Router);

  ips = signal<IPProfileInterface[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.api.getAll().subscribe(list => {
      this.ips.set(list);
      this.loading.set(false);
    });
  }

  newIp(): void {
    this.router.navigate(['/ip-edit']);
  }

  editIp(id: string): void {
    this.router.navigate(['/ip-edit', id]);
  }
}
