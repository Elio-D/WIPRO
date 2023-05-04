import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKursgruppeEditFormComponent } from './admin-kursgruppe-edit-form.component';

describe('AdminKursgruppeEditFormComponent', () => {
  let component: AdminKursgruppeEditFormComponent;
  let fixture: ComponentFixture<AdminKursgruppeEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminKursgruppeEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKursgruppeEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
