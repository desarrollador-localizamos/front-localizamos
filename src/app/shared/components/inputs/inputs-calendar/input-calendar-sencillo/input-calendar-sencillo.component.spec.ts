import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCalendarSencilloComponent } from './input-calendar-sencillo.component';

describe('InputCalendarSencilloComponent', () => {
  let component: InputCalendarSencilloComponent;
  let fixture: ComponentFixture<InputCalendarSencilloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputCalendarSencilloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputCalendarSencilloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
