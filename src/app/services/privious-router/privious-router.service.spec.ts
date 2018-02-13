import { TestBed, inject } from '@angular/core/testing';

import { PriviousRouterService } from './privious-router.service';

describe('PriviousRouterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PriviousRouterService]
    });
  });

  it('should be created', inject([PriviousRouterService], (service: PriviousRouterService) => {
    expect(service).toBeTruthy();
  }));
});
