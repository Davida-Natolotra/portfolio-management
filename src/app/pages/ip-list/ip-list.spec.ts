import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpList } from './ip-list';

describe('IpList', () => {
  let component: IpList;
  let fixture: ComponentFixture<IpList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IpList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
