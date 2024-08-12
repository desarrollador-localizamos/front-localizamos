import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralMonitoreoComponent } from './central-monitoreo.component';

describe('CentralMonitoreoComponent', () => {
  let component: CentralMonitoreoComponent;
  let fixture: ComponentFixture<CentralMonitoreoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentralMonitoreoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CentralMonitoreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
