import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaInfoAccionComponent } from './ventana-info-accion.component';

describe('VentanaInfoAccionComponent', () => {
  let component: VentanaInfoAccionComponent;
  let fixture: ComponentFixture<VentanaInfoAccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentanaInfoAccionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentanaInfoAccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
