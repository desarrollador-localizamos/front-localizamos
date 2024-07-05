import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAvanzadaComponent } from './table-avanzada.component';

describe('TableAvanzadaComponent', () => {
  let component: TableAvanzadaComponent;
  let fixture: ComponentFixture<TableAvanzadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableAvanzadaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableAvanzadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
