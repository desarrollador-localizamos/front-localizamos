import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAvanzadoComponent } from './select-avanzado.component';

describe('SelectAvanzadoComponent', () => {
  let component: SelectAvanzadoComponent;
  let fixture: ComponentFixture<SelectAvanzadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectAvanzadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectAvanzadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
