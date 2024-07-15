import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalesComponent } from './modales.component';

describe('ModalesComponent', () => {
  let component: ModalesComponent;
  let fixture: ComponentFixture<ModalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
