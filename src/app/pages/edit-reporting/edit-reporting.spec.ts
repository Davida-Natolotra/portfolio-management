import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReporting } from './edit-reporting';

describe('EditReporting', () => {
  let component: EditReporting;
  let fixture: ComponentFixture<EditReporting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditReporting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditReporting);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
