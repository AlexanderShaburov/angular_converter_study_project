import { TestBed } from '@angular/core/testing';

import { CurrensyDataGatherService } from './currensy-data-gather.service';

describe('CurrensyDataGatherService', () => {
  let service: CurrensyDataGatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrensyDataGatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
