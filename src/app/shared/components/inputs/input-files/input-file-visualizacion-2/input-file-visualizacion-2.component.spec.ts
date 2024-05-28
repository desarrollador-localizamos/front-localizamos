import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFileVisualizacion2Component } from './input-file-visualizacion-2.component';

describe('InputFileVisualizacion2Component', () => {
  let component: InputFileVisualizacion2Component;
  let fixture: ComponentFixture<InputFileVisualizacion2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFileVisualizacion2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputFileVisualizacion2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
