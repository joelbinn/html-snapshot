import { TestBed } from '@angular/core/testing';

import { MyStoreService } from './my-store.service';

describe('MyStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyStoreService = TestBed.get(MyStoreService);
    expect(service).toBeTruthy();
  });
});
