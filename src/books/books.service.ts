import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Books } from './schemas/book.schema';
import { Model } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Books.name) private readonly booksModel: Model<Books>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Books> {
    const createdBook = new this.booksModel(createBookDto);
    return createdBook.save();
  }
}
