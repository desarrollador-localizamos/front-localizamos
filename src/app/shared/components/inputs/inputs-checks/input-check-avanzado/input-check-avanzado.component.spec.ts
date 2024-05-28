import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCheckAvanzadoComponent } from './input-check-avanzado.component';

describe('InputCheckAvanzadoComponent', () => {
  let component: InputCheckAvanzadoComponent;
  let fixture: ComponentFixture<InputCheckAvanzadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputCheckAvanzadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputCheckAvanzadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
