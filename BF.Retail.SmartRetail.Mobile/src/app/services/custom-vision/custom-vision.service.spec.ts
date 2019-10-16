import { TestBed } from '@angular/core/testing';

import { CustomVisionService } from './custom-vision.service';

describe('CustomVisionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomVisionService = TestBed.get(CustomVisionService);
    expect(service).toBeTruthy();
  });
});
