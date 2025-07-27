import { TestBed } from '@angular/core/testing';

import { GenericAPIHandler } from './generic-apihandler';

describe('GenericAPIHandler', () => {
  let service: GenericAPIHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericAPIHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
