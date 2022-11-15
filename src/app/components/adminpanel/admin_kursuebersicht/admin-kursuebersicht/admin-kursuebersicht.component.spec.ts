import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKursuebersichtComponent } from './admin-kursuebersicht.component';

describe('AdminKursuebersichtComponent', () => {
  let component: AdminKursuebersichtComponent;
  let fixture: ComponentFixture<AdminKursuebersichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminKursuebersichtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKursuebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
