import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteRutaComponent } from './reporte-ruta.component';

describe('ReporteRutaComponent', () => {
  let component: ReporteRutaComponent;
  let fixture: ComponentFixture<ReporteRutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteRutaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
