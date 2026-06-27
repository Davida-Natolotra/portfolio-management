import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-reporting-list',
  imports: [TableModule, CardModule, ButtonModule, TagModule, InputTextModule],
  templateUrl: './reporting-list.html',
  styleUrl: './reporting-list.scss',
})
export class ReportingList {
  users = [
    {
      name: 'John Doe',
      position: 'Software Engineer',
      office: 'New York',
      age: 28,
      start: '2019/04/25',
      salary: '$89,000',
    },
    {
      name: 'Jane Smith',
      position: 'Product Manager',
      office: 'London',
      age: 34,
      start: '2017/01/12',
      salary: '$120,000',
    },
    {
      name: 'Bob Johnson',
      position: 'Designer',
      office: 'San Francisco',
      age: 26,
      start: '2021/07/03',
      salary: '$76,000',
    },
    {
      name: 'Alice Brown',
      position: 'DevOps Engineer',
      office: 'Berlin',
      age: 31,
      start: '2018/11/20',
      salary: '$95,000',
    },
    {
      name: 'Charlie Wilson',
      position: 'Data Scientist',
      office: 'Toronto',
      age: 29,
      start: '2020/03/15',
      salary: '$105,000',
    },
    {
      name: 'Eva Martinez',
      position: 'QA Engineer',
      office: 'Madrid',
      age: 27,
      start: '2022/02/08',
      salary: '$72,000',
    },
    {
      name: 'David Lee',
      position: 'Backend Developer',
      office: 'Seoul',
      age: 32,
      start: '2016/09/01',
      salary: '$98,000',
    },
    {
      name: 'Sophie Turner',
      position: 'UI/UX Designer',
      office: 'Paris',
      age: 30,
      start: '2019/12/11',
      salary: '$84,000',
    },
  ];

  statuses: { label: string; value: 'success' | 'danger' | 'warn' }[] = [
    { label: 'Active', value: 'success' },
    { label: 'Inactive', value: 'danger' },
    { label: 'Pending', value: 'warn' },
  ];

  getStatus(index: number) {
    return this.statuses[index % 3];
  }
}
