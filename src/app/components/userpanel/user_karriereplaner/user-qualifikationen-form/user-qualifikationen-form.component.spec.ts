import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQualifikationenFormComponent } from './user-qualifikationen-form.component';

describe('UserQualifikationenFormComponent', () => {
  let component: UserQualifikationenFormComponent;
  let fixture: ComponentFixture<UserQualifikationenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserQualifikationenFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserQualifikationenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
