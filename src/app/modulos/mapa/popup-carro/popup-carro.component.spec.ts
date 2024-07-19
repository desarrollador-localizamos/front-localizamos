import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCarroComponent } from './popup-carro.component';

describe('PopupCarroComponent', () => {
  let component: PopupCarroComponent;
  let fixture: ComponentFixture<PopupCarroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupCarroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupCarroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
