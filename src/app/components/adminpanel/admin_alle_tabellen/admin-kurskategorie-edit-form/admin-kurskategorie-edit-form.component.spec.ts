import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKurskategorieEditFormComponent } from './admin-kurskategorie-edit-form.component';

describe('AdminKurskategorieEditFormComponent', () => {
  let component: AdminKurskategorieEditFormComponent;
  let fixture: ComponentFixture<AdminKurskategorieEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminKurskategorieEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKurskategorieEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
