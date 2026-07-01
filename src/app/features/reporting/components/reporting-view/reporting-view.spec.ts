import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingView } from './reporting-view';

describe('ReportingView', () => {
  let component: ReportingView;
  let fixture: ComponentFixture<ReportingView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportingView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportingView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
