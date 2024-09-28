import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from 'src/common/enum/category.enum';

export type BooksDocument = Books & Document;

@Schema()
export class Books {

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  publicationDate: Date;

  @Prop({ required: true })
  author: string;

  @Prop({ type: [String], enum: Category, required: true })
  categories: Category[];
}

export const BookSchema = SchemaFactory.createForClass(Books);