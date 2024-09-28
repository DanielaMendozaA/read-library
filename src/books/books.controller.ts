import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException, Logger } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { BookResponseDto } from './dto/book-response.dto';
import { ApiDocCreateBook, ApiDocGetAllBooks, ApiDocGetBookById, ApiQueryBooks } from 'src/books/decorators/books.swagger.decorator';
import { QueryDto } from './dto/query.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { Types } from 'mongoose';

@Controller('books')
@ApiTags('Books')
@ApiExtraModels(BookResponseDto)
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
  ) { }

  @ApiDocCreateBook(BookResponseDto)
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @ApiDocGetAllBooks(BookResponseDto)
  @ApiQueryBooks()
  @Get()
  findAll(@Query() queryDto: QueryDto) {
    return this.booksService.findAllByQuerys(queryDto);
  }

  @ApiDocGetBookById(BookResponseDto)
  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.booksService.GetById(id);

  }




}
