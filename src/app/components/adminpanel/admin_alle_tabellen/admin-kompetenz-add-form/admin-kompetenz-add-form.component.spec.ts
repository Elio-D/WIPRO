import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKompetenzAddFormComponent } from './admin-kompetenz-add-form.component';

describe('AdminKompetenzAddFormComponent', () => {
  let component: AdminKompetenzAddFormComponent;
  let fixture: ComponentFixture<AdminKompetenzAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminKompetenzAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKompetenzAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
