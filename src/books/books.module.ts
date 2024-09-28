import { Logger, Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Books, BooksSchema } from './schemas/book.schema';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Books.name, schema: BooksSchema }]),
    CommonModule
  ],
  controllers: [BooksController],
  providers: [BooksService, Logger],
  exports: [BooksService, MongooseModule],
})
export class BooksModule {}
