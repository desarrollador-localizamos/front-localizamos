import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePruebaComponent } from './table-prueba.component';

describe('TablePruebaComponent', () => {
  let component: TablePruebaComponent;
  let fixture: ComponentFixture<TablePruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePruebaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablePruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
