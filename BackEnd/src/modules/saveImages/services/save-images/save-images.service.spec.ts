import { Test, TestingModule } from '@nestjs/testing';
import { SaveImagesService } from './save-images.service';

describe('SaveImagesService', () => {
  let service: SaveImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaveImagesService],
    }).compile();

    service = module.get<SaveImagesService>(SaveImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
