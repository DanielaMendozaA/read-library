import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsArray, IsEnum, IsDate } from 'class-validator';
import { Category } from 'src/common/enum/category.enum';

export class CreateBookDto {

  @ApiProperty({ description: "The book's title", example: 'La revelión de las ratas' })
  @IsString()
  title: string;

  @ApiProperty({ description: "Publication date", example: '1970-05-12' })
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  publicationDate: Date;

  @ApiProperty({ description: "The book's Author", example: 'Fernando Soto Aparicio' })
  @IsString()
  author: string;

  @ApiProperty({
    description: "The book's categories",
    example: [Category.FICTION, Category.ROMANCE], 
  })
  @IsArray()
  @IsEnum(Category, { each: true })
  categories: Category[];
}