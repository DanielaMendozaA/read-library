import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/common/enum/category.enum';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiProperty({ example: 'The Great Gatsby' })
  title?: string;

  @ApiProperty({ example: 'F. Scott Fitzgerald' })
  author?: string;

  @ApiProperty({ example: '2021-05-12' })
  publicationDate?: Date;

  @ApiProperty({ example: [Category.FICTION, Category.ROMANCE] })
  categories?: Category[];
}