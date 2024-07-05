import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaDynamicComponent } from './vista-dynamic.component';

describe('VistaDynamicComponent', () => {
  let component: VistaDynamicComponent;
  let fixture: ComponentFixture<VistaDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaDynamicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
