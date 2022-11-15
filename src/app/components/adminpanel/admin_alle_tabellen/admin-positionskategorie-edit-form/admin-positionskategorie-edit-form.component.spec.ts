import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPositionskategorieEditFormComponent } from './admin-positionskategorie-edit-form.component';

describe('AdminPositionskategorieEditFormComponent', () => {
  let component: AdminPositionskategorieEditFormComponent;
  let fixture: ComponentFixture<AdminPositionskategorieEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPositionskategorieEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPositionskategorieEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
