import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPositionskategorieAddFormComponent } from './admin-positionskategorie-add-form.component';

describe('AdminPositionskategorieAddFormComponent', () => {
  let component: AdminPositionskategorieAddFormComponent;
  let fixture: ComponentFixture<AdminPositionskategorieAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPositionskategorieAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPositionskategorieAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
