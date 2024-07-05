import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSencillaComponent } from './table-sencilla.component';

describe('TableSencillaComponent', () => {
  let component: TableSencillaComponent;
  let fixture: ComponentFixture<TableSencillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSencillaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableSencillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
