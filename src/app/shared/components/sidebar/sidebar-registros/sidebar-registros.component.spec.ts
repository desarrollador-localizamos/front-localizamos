import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarRegistrosComponent } from './sidebar-registros.component';

describe('SidebarRegistrosComponent', () => {
  let component: SidebarRegistrosComponent;
  let fixture: ComponentFixture<SidebarRegistrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarRegistrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
