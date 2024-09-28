import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Books } from './schemas/book.schema';
import { NotFoundException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { ExceptionHandlerService } from 'src/common/services/error-database-handler.service';
import { IBookService } from './interfaces/book-service.interface';
import { Category } from 'src/common/enum/category.enum';

const mockBook = {
  title: 'Test Book',
  author: 'Test Author',
  categories: [Category.EDUCATION],
  publicationDate: new Date('2022-01-01'),
};

describe('BooksService', () => {
  let service: IBookService;
  let model: Model<Books>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'IBookService',
          useClass: BooksService,
        },
        {
          provide: getModelToken(Books.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockBook),
            constructor: jest.fn().mockResolvedValue(mockBook),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findOneAndUpdate: jest.fn(),
            save: jest.fn(),
            exec: jest.fn(),
          },
        },
        Logger,
        ExceptionHandlerService,
      ],
    }).compile();

    service = module.get<IBookService>('IBookService');
    model = module.get<Model<Books>>(getModelToken(Books.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new book', async () => {
      const saveMock = jest.fn().mockResolvedValueOnce(mockBook);
      const mockBookModelInstance = { save: saveMock };

      jest.spyOn(model, 'create').mockReturnValue(mockBookModelInstance as any);

      const result = await service.create(mockBook);
      expect(result).toEqual(mockBook);
      expect(saveMock).toHaveBeenCalled();
    });
  });


  describe('findAllByQuerys', () => {
    it('should return an array of books', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValueOnce([mockBook]),
      } as any);
      const result = await service.findAllByQuerys({});
      expect(result).toEqual([mockBook]);
    });
  });

  describe('GetById', () => {
    it('should return a book if found', async () => {
      jest.spyOn(model, 'findById').mockResolvedValueOnce(mockBook as any);
      const result = await service.GetById('someId' as any);
      expect(result).toEqual(mockBook);
    });

    it('should throw a NotFoundException if book is not found', async () => {
      jest.spyOn(model, 'findById').mockResolvedValueOnce(null);
      await expect(service.GetById('someId' as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the updated book', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValueOnce(mockBook as any);
      const result = await service.update('someId' as any, mockBook as any);
      expect(result).toEqual(mockBook);
    });

    it('should throw a NotFoundException if book to update is not found', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValueOnce(null);
      await expect(service.update('someId' as any, mockBook as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should soft delete a book and return the updated book', async () => {
      const deletedBook = { ...mockBook, isDeleted: true, deletedAt: new Date() };
      jest.spyOn(model, 'findOneAndUpdate').mockResolvedValueOnce(deletedBook as any);
      const result = await service.remove('someId' as any);
      expect(result).toEqual(deletedBook);
    });

    it('should throw a NotFoundException if book to delete is not found', async () => {
      jest.spyOn(model, 'findOneAndUpdate').mockResolvedValueOnce(null);
      await expect(service.remove('someId' as any)).rejects.toThrow(NotFoundException);
    });
  });
});
