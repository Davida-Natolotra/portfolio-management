import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard-component',
  imports: [CommonModule, CardModule, TableModule, TagModule, ProgressBarModule, ChartModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  stats = [
    {
      label: 'All Earnings',
      value: '$30,200',
      icon: 'pi pi-chart-bar',
      color: '#7c4dff',
      bg: '#ede7f6',
    },
    { label: 'Page Views', value: '290+', icon: 'pi pi-file', color: '#00897b', bg: '#e0f2f1' },
    {
      label: 'Task Completed',
      value: '145',
      icon: 'pi pi-check-circle',
      color: '#e53935',
      bg: '#ffebee',
    },
    { label: 'Downloads', value: '500', icon: 'pi pi-download', color: '#1e88e5', bg: '#e3f2fd' },
  ];

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
}
