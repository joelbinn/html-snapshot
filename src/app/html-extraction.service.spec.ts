import { TestBed } from '@angular/core/testing';

import { HtmlExtractionService } from './html-extraction.service';

describe('HtmlExtractionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HtmlExtractionService = TestBed.get(HtmlExtractionService);
    expect(service).toBeTruthy();
  });
});
