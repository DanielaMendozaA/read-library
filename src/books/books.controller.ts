import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException, Logger, UseGuards, Inject } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { ApiExtraModels, ApiParam, ApiTags } from '@nestjs/swagger';
import { BookResponseDto } from './dto/book-response.dto';
import { ApiDocCreateBook, ApiDocDeleteBook, ApiDocGetAllBooks, ApiDocGetBookById, ApiDocUpdateBook, ApiQueryBooks } from 'src/books/decorators/books.swagger.decorator';
import { QueryDto } from './dto/query.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { Types } from 'mongoose';
import { UpdateBookDto } from './dto/update-book.dto';
import { DeleteResponseDto } from './dto/delete-response.dto';
import { ApiKeyGuard } from 'src/guard/api-key-guard.guard';
import { IBookService } from './interfaces/book-service.interface';

@Controller('books')
@ApiTags('Books')
@ApiExtraModels(BookResponseDto)
export class BooksController {
  constructor(
    @Inject('IBookService')
    private readonly booksService: IBookService
  ) { }

  @ApiDocCreateBook(BookResponseDto)
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @ApiDocGetAllBooks(BookResponseDto)
  @ApiQueryBooks()
  @Get()
  @UseGuards(ApiKeyGuard)
  findAll(@Query() queryDto: QueryDto) {
    return this.booksService.findAllByQuerys(queryDto);
  }

  @ApiDocGetBookById(BookResponseDto)
  @ApiParam({
    name: 'id',
    description: 'MongoDB ObjectId of the book',
    type: String,
    example: '66f83df2a71a1180fda8b8b9',
  })
  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.booksService.GetById(id);
  }

  @ApiDocUpdateBook(BookResponseDto)
  @ApiParam({
    name: 'id',
    description: 'MongoDB ObjectId of the book',
    type: String,
    example: '66f83df2a71a1180fda8b8b9', 
  })
  @Patch(':id')
  update(@Param('id', ParseMongoIdPipe) id: Types.ObjectId, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @ApiDocDeleteBook(DeleteResponseDto)
  @ApiParam({
    name: 'id',
    description: 'MongoDB ObjectId of the book',
    type: String,
    example: '66f83df2a71a1180fda8b8b9',
  })
  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.booksService.remove(id);
  }



}
