import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { BookResponseDto } from './dto/book-response.dto';
import { ApiDocCreateBook, ApiDocGetAllBooks, ApiQueryBooks } from 'src/books/decorators/books.swagger.decorator';
import { QueryDto } from './dto/query.dto';

@Controller('books')
@ApiTags('Books')
@ApiExtraModels(BookResponseDto)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

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
  



}
