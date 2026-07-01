import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpEdit } from './ip-edit';

describe('IpEdit', () => {
  let component: IpEdit;
  let fixture: ComponentFixture<IpEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IpEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
