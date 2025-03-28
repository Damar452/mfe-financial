import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanckAccountCreateComponent } from './banck-account-create.component';

describe('BanckAccountCreateComponent', () => {
  let component: BanckAccountCreateComponent;
  let fixture: ComponentFixture<BanckAccountCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BanckAccountCreateComponent]
    });
    fixture = TestBed.createComponent(BanckAccountCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
