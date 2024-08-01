import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCustomersComponent } from './table-customers.component';

describe('TableCustomersComponent', () => {
  let component: TableCustomersComponent;
  let fixture: ComponentFixture<TableCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableCustomersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
