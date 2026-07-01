import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingEdit } from './reporting-edit';

describe('ReportingEdit', () => {
  let component: ReportingEdit;
  let fixture: ComponentFixture<ReportingEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportingEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportingEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
