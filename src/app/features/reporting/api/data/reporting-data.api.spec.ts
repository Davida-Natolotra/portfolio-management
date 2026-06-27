import { TestBed } from '@angular/core/testing';

import { ReportingDataApi } from './reporting-data.api';

describe('ReportingDataApi', () => {
  let service: ReportingDataApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportingDataApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
