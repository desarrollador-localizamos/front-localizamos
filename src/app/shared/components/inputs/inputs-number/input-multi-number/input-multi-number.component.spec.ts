import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMultiNumberComponent } from './input-multi-number.component';

describe('InputMultiNumberComponent', () => {
  let component: InputMultiNumberComponent;
  let fixture: ComponentFixture<InputMultiNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputMultiNumberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputMultiNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
