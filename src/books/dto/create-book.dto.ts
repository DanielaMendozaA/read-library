import { Transform } from 'class-transformer';
import { IsString, IsArray, IsEnum, IsDate } from 'class-validator';
import { Category } from 'src/common/enum/category.enum';

export class CreateBookDto {
  @IsString()
  title: string;

  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  publicationDate: Date;

  @IsString()
  author: string;

  @IsArray()
  @IsEnum(Category, { each: true })
  categories: Category[];
}