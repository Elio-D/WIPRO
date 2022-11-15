import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserKursdetailComponent } from './user-kursdetail.component';

describe('UserKursdetailComponent', () => {
  let component: UserKursdetailComponent;
  let fixture: ComponentFixture<UserKursdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserKursdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserKursdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
