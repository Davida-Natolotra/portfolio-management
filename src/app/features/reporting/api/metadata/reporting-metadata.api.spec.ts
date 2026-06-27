import { TestBed } from '@angular/core/testing';

import { ReportingMetadataApi } from './reporting-metadata.api';

describe('ReportingMetadataApi', () => {
  let service: ReportingMetadataApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportingMetadataApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
