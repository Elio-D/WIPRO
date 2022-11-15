import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKursEditFormComponent } from './admin-kurs-edit-form.component';

describe('AdminKursEditFormComponent', () => {
  let component: AdminKursEditFormComponent;
  let fixture: ComponentFixture<AdminKursEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminKursEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKursEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
