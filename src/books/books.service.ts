import { Injectable, Get, Logger, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Books } from './schemas/book.schema';
import { Model, Types } from 'mongoose';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { QueryDto } from './dto/query.dto';
import { ExceptionHandlerService } from 'src/common/services/error-database-handler.service';
import { IBookService } from './interfaces/book-service.interface';

@Injectable()
@CatchErrors()
export class BooksService implements IBookService{
  constructor(
    @InjectModel(Books.name) private readonly booksModel: Model<Books>,
    private readonly loggerService: Logger,
    private readonly exceptionHandlerService: ExceptionHandlerService
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Books> {
    const createdBook = new this.booksModel(createBookDto);
    return createdBook.save();
  }

  async findAllByQuerys(queryDto: QueryDto): Promise<Books[]> {
    const { author, title, category, publicationDate, publishedAfter, limit = 10, offset = 0 } = queryDto;

    const filters: any = {};
    if(title)
      filters.title = { $regex: title, $options: 'i' };

    if(author)
      filters.author = { $regex: author, $options: 'i' };

    if(category)
      filters.categories = { $in:[ category ] };

    if(publicationDate)
      filters.publicationDate = publicationDate;

    if(publishedAfter)
      filters.publicationDate = { $gte: publishedAfter };

    const skip = offset;

    const query = this.booksModel
    .find(filters)
    .limit(Number(limit))
    .skip(skip)
    .sort({ author: 1 });

    return query.exec();

  }

  async GetById(id: Types.ObjectId): Promise<Books> {
    const book = await this.booksModel.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;

  }

  async update(id: Types.ObjectId, updateBookDto: UpdateBookDto): Promise<Books> {
    const book = await this.booksModel.findByIdAndUpdate({ _id: id }, updateBookDto, { new: true });
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  
  
  }

  // async remove(id: Types.ObjectId){
  //   const deletedRows = await this.booksModel.deleteOne({ _id: id });
  //   console.log(deletedRows);
  //   if(deletedRows.deletedCount === 0){
  //     throw new NotFoundException('Book not found');
  //   }

  //   return deletedRows;


  // }

  async remove(id: Types.ObjectId): Promise<Books> {
    const book = await this.booksModel.findOneAndUpdate(
      { _id: id },
      { isDeleted: true, deletedAt: new Date() },
      { new: true },
    );
    
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }


} 
