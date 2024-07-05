import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSubTableComponent } from './table-sub-table.component';

describe('TableSubTableComponent', () => {
  let component: TableSubTableComponent;
  let fixture: ComponentFixture<TableSubTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSubTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableSubTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
