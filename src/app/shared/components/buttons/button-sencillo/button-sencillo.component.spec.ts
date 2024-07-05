import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSencilloComponent } from './button-sencillo.component';

describe('ButtonSencilloComponent', () => {
  let component: ButtonSencilloComponent;
  let fixture: ComponentFixture<ButtonSencilloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonSencilloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonSencilloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
