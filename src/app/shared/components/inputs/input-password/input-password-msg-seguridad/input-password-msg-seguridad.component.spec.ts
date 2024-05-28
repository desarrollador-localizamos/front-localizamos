import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPasswordMsgSeguridadComponent } from './input-password-msg-seguridad.component';

describe('InputPasswordMsgSeguridadComponent', () => {
  let component: InputPasswordMsgSeguridadComponent;
  let fixture: ComponentFixture<InputPasswordMsgSeguridadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputPasswordMsgSeguridadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputPasswordMsgSeguridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
