import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpProfile } from './ip-profile';

describe('IpProfile', () => {
  let component: IpProfile;
  let fixture: ComponentFixture<IpProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IpProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
