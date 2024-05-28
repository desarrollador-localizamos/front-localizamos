import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFileVisualizacionComponent } from './input-file-visualizacion.component';

describe('InputFileVisualizacionComponent', () => {
  let component: InputFileVisualizacionComponent;
  let fixture: ComponentFixture<InputFileVisualizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFileVisualizacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputFileVisualizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
