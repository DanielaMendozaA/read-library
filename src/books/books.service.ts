import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Books } from './schemas/book.schema';
import { Model } from 'mongoose';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { QueryDto } from './dto/query.dto';

@Injectable()
@CatchErrors()
export class BooksService {
  constructor(
    @InjectModel(Books.name) private readonly booksModel: Model<Books>,
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
    .sort({ author: -1 });

    return query.exec();

  }
}
