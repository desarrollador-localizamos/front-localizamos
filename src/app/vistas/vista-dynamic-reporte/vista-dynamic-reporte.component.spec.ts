import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaDynamicReporteComponent } from './vista-dynamic-reporte.component';

describe('VistaDynamicReporteComponent', () => {
  let component: VistaDynamicReporteComponent;
  let fixture: ComponentFixture<VistaDynamicReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaDynamicReporteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaDynamicReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
