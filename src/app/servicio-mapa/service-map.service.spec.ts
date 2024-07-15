import { TestBed } from '@angular/core/testing';

import { ServiceMapService } from './service-map.service';

describe('ServiceMapService', () => {
  let service: ServiceMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
