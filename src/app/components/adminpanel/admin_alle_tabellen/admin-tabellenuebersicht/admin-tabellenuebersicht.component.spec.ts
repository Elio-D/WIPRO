import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTabellenuebersichtComponent } from './admin-tabellenuebersicht.component';

describe('AdminTabellenuebersichtComponent', () => {
  let component: AdminTabellenuebersichtComponent;
  let fixture: ComponentFixture<AdminTabellenuebersichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTabellenuebersichtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTabellenuebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
