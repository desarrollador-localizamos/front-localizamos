import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFileSencilloAlertaComponent } from './input-file-sencillo-alerta.component';

describe('InputFileSencilloAlertaComponent', () => {
  let component: InputFileSencilloAlertaComponent;
  let fixture: ComponentFixture<InputFileSencilloAlertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFileSencilloAlertaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputFileSencilloAlertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
