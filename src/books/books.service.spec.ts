import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getModelToken } from '@nestjs/mongoose';
import { Books } from './schemas/book.schema';
import { Model } from 'mongoose';

const mockBook = {
  title: 'Test Book',
  publicationDate: '2023-10-01',
  author: 'Test Author',
  categories: ['Fiction'],
};

const mockBookModel = {
  save: jest.fn().mockResolvedValue(mockBook),
  create: jest.fn().mockReturnValue(mockBook),
};

describe('BooksService', () => {
  let service: BooksService;
  let model: Model<Books>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Books.name),
          useValue: mockBookModel,
        }
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    model = module.get<Model<Books>>(getModelToken(Books.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
