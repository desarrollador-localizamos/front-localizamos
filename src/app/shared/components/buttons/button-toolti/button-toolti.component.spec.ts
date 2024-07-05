import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonTooltiComponent } from './button-toolti.component';

describe('ButtonTooltiComponent', () => {
  let component: ButtonTooltiComponent;
  let fixture: ComponentFixture<ButtonTooltiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonTooltiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonTooltiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
