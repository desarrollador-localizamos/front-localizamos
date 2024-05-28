import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputColorComponent } from './input-color.component';

describe('InputColorComponent', () => {
  let component: InputColorComponent;
  let fixture: ComponentFixture<InputColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputColorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
