import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPositionsuebersichtComponent } from './admin-positionsuebersicht.component';

describe('AdminPositionsuebersichtComponent', () => {
  let component: AdminPositionsuebersichtComponent;
  let fixture: ComponentFixture<AdminPositionsuebersichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPositionsuebersichtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPositionsuebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
