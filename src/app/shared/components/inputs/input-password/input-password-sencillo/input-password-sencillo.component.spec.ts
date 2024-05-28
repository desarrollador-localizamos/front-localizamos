import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPasswordSencilloComponent } from './input-password-sencillo.component';

describe('InputPasswordSencilloComponent', () => {
  let component: InputPasswordSencilloComponent;
  let fixture: ComponentFixture<InputPasswordSencilloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputPasswordSencilloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputPasswordSencilloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
