import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingList } from './reporting-list';

describe('ReportingList', () => {
  let component: ReportingList;
  let fixture: ComponentFixture<ReportingList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportingList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportingList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
