import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFileSencilloComponent } from './input-file-sencillo.component';

describe('InputFileSencilloComponent', () => {
  let component: InputFileSencilloComponent;
  let fixture: ComponentFixture<InputFileSencilloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFileSencilloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputFileSencilloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
