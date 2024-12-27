import { TestBed } from '@angular/core/testing';

import { SaveConversionService } from './save-conversion.service';

describe('SaveConversionService', () => {
  let service: SaveConversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveConversionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
