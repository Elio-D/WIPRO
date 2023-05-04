import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKursgruppeAddFormComponent } from './admin-kursgruppe-add-form.component';

describe('AdminKursgruppeAddFormComponent', () => {
  let component: AdminKursgruppeAddFormComponent;
  let fixture: ComponentFixture<AdminKursgruppeAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminKursgruppeAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKursgruppeAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
