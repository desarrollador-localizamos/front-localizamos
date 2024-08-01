import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAgrupacionComponent } from './table-agrupacion.component';

describe('TableAgrupacionComponent', () => {
  let component: TableAgrupacionComponent;
  let fixture: ComponentFixture<TableAgrupacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableAgrupacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableAgrupacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
