import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPositionsuebersichtComponent } from './user-positionsuebersicht.component';

describe('UserPositionsuebersichtComponent', () => {
  let component: UserPositionsuebersichtComponent;
  let fixture: ComponentFixture<UserPositionsuebersichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPositionsuebersichtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPositionsuebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
