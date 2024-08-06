import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBuscadorComponent } from './modal-buscador.component';

describe('ModalBuscadorComponent', () => {
  let component: ModalBuscadorComponent;
  let fixture: ComponentFixture<ModalBuscadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalBuscadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalBuscadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
