import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Books } from 'src/books/schemas/book.schema';
import { BookSeeder } from './book.seeder.service';


@Module({
  imports: [
    MongooseModule
  ],
  providers: [BookSeeder],
  exports: [BookSeeder],
})
export class BookSeederModule {}