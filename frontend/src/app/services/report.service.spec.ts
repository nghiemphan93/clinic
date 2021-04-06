import { TestBed } from '@angular/core/testing';

import { ReportService } from './report.service';
import { HttpTestingController } from '@angular/common/http/testing';

describe('ReportService', () => {
  let service: ReportService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpTestingController],
      providers: [service],
    });
    service = TestBed.inject(ReportService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
