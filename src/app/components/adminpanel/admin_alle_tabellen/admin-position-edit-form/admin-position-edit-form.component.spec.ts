import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPositionEditFormComponent } from './admin-position-edit-form.component';

describe('AdminPositionEditFormComponent', () => {
  let component: AdminPositionEditFormComponent;
  let fixture: ComponentFixture<AdminPositionEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPositionEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPositionEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
