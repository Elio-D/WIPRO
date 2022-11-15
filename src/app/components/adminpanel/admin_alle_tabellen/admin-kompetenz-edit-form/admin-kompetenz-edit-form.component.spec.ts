import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKompetenzEditFormComponent } from './admin-kompetenz-edit-form.component';

describe('AdminKompetenzEditFormComponent', () => {
  let component: AdminKompetenzEditFormComponent;
  let fixture: ComponentFixture<AdminKompetenzEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminKompetenzEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKompetenzEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
