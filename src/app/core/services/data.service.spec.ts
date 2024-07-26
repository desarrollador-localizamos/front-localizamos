import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { DataSimpleService } from './datasimple.service';

describe('DataService', () => {
  let service: DataService;
  let servicesimple: DataSimpleService;

  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
    servicesimple = TestBed.inject(DataSimpleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(servicesimple).toBeTruthy();
  });
});
