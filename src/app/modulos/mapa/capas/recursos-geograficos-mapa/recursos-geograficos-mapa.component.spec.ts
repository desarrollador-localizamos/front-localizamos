import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosGeograficosMapaComponent } from './recursos-geograficos-mapa.component';

describe('RecursosGeograficosMapaComponent', () => {
  let component: RecursosGeograficosMapaComponent;
  let fixture: ComponentFixture<RecursosGeograficosMapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecursosGeograficosMapaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecursosGeograficosMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
