import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserKarriereplanerFormsComponent } from './user-karriereplaner-forms.component';

describe('UserKarriereplanerFormsComponent', () => {
  let component: UserKarriereplanerFormsComponent;
  let fixture: ComponentFixture<UserKarriereplanerFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserKarriereplanerFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserKarriereplanerFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
