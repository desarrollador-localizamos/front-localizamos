import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOtpCodigoComponent } from './input-otp-codigo.component';

describe('InputOtpCodigoComponent', () => {
  let component: InputOtpCodigoComponent;
  let fixture: ComponentFixture<InputOtpCodigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputOtpCodigoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputOtpCodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
