import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPositionsdetailComponent } from './user-positionsdetail.component';

describe('UserPositionsdetailComponent', () => {
  let component: UserPositionsdetailComponent;
  let fixture: ComponentFixture<UserPositionsdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPositionsdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPositionsdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
