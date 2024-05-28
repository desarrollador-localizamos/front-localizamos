import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRangeComponent } from './input-range.component';

describe('InputRangeComponent', () => {
  let component: InputRangeComponent;
  let fixture: ComponentFixture<InputRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputRangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
