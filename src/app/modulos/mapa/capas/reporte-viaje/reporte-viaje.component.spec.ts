import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteViajeComponent } from './reporte-viaje.component';

describe('ReporteViajeComponent', () => {
  let component: ReporteViajeComponent;
  let fixture: ComponentFixture<ReporteViajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteViajeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
