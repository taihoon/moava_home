import { TestBed, inject } from '@angular/core/testing';

import { VideoListService } from './video-list.service';

describe('VideoListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VideoListService]
    });
  });

  it('should be created', inject([VideoListService], (service: VideoListService) => {
    expect(service).toBeTruthy();
  }));
});
