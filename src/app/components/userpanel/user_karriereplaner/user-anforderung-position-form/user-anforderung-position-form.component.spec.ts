import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAnforderungPositionFormComponent } from './user-anforderung-position-form.component';

describe('UserAnforderungPositionFormComponent', () => {
  let component: UserAnforderungPositionFormComponent;
  let fixture: ComponentFixture<UserAnforderungPositionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAnforderungPositionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAnforderungPositionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
