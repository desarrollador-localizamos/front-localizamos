import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCalendarTemplateComponent } from './input-calendar-template.component';

describe('InputCalendarTemplateComponent', () => {
  let component: InputCalendarTemplateComponent;
  let fixture: ComponentFixture<InputCalendarTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputCalendarTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputCalendarTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
