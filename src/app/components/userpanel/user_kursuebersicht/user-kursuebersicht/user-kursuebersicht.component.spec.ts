import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserKursuebersichtComponent } from './user-kursuebersicht.component';

describe('UserKursuebersichtComponent', () => {
  let component: UserKursuebersichtComponent;
  let fixture: ComponentFixture<UserKursuebersichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserKursuebersichtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserKursuebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
