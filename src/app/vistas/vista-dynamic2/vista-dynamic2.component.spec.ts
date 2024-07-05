import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaDynamic2Component } from './vista-dynamic2.component';

describe('VistaDynamic2Component', () => {
  let component: VistaDynamic2Component;
  let fixture: ComponentFixture<VistaDynamic2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaDynamic2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaDynamic2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
