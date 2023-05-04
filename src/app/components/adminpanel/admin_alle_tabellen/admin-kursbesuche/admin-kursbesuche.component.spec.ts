import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKursbesucheComponent } from './admin-kursbesuche.component';

describe('AdminKursbesucheComponent', () => {
  let component: AdminKursbesucheComponent;
  let fixture: ComponentFixture<AdminKursbesucheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminKursbesucheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKursbesucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
