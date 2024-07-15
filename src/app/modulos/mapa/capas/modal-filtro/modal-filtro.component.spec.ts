import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFiltroComponent } from './modal-filtro.component';

describe('ModalFiltroComponent', () => {
  let component: ModalFiltroComponent;
  let fixture: ComponentFixture<ModalFiltroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalFiltroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
