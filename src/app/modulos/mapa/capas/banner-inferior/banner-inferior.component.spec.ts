import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerInferiorComponent } from './banner-inferior.component';

describe('BannerInferiorComponent', () => {
  let component: BannerInferiorComponent;
  let fixture: ComponentFixture<BannerInferiorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerInferiorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BannerInferiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
