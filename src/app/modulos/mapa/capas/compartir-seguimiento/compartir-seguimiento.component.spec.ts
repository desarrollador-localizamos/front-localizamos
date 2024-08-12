import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompartirSeguimientoComponent } from './compartir-seguimiento.component';

describe('CompartirSeguimientoComponent', () => {
  let component: CompartirSeguimientoComponent;
  let fixture: ComponentFixture<CompartirSeguimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompartirSeguimientoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompartirSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
