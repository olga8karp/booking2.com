import { TestBed } from '@angular/core/testing';

import { ImagesUploaderService } from './images-uploader.service';

describe('ImagesUploaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImagesUploaderService = TestBed.get(ImagesUploaderService);
    expect(service).toBeTruthy();
  });
});
