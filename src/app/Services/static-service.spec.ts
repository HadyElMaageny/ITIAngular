import { TestBed } from '@angular/core/testing';

import { StaticProductService } from './static-product.service';

describe('StaticService', () => {
  let service: StaticProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
