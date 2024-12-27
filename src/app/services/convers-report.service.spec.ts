import { TestBed } from '@angular/core/testing';

import { ConversReportService } from './convers-report.service';

describe('ConversReportService', () => {
  let service: ConversReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
