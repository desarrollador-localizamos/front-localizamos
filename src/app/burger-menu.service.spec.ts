import { TestBed } from '@angular/core/testing';

import { BurgerMenuService } from './burger-menu.service';

describe('BurgerMenuService', () => {
  let service: BurgerMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BurgerMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
