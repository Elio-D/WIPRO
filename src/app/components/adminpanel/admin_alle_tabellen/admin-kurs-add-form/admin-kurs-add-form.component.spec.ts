import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKursAddFormComponent } from './admin-kurs-add-form.component';

describe('AdminKursAddFormComponent', () => {
  let component: AdminKursAddFormComponent;
  let fixture: ComponentFixture<AdminKursAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminKursAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKursAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
