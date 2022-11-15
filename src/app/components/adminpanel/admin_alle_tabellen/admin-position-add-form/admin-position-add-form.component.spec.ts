import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPositionAddFormComponent } from './admin-position-add-form.component';

describe('AdminPositionAddFormComponent', () => {
  let component: AdminPositionAddFormComponent;
  let fixture: ComponentFixture<AdminPositionAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPositionAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPositionAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
