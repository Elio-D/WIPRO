import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKurskategorieAddFormComponent } from './admin-kurskategorie-add-form.component';

describe('AdminKurskategorieAddFormComponent', () => {
  let component: AdminKurskategorieAddFormComponent;
  let fixture: ComponentFixture<AdminKurskategorieAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminKurskategorieAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKurskategorieAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
