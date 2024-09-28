import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Category } from 'src/common/enum/category.enum';
import { Types } from 'mongoose';
import { softDeletePlugin } from 'src/common/plugins/soft-delete.plugin'; // Plugin de soft delete

export type BooksDocument = Books & Document;

@Schema()
export class Books {
  @Prop({ type: Types.ObjectId, auto: true })
  id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  publicationDate: Date;

  @Prop({ required: true })
  author: string;

  @Prop({ type: [String], enum: Category, required: true })
  categories: Category[];


  @Prop()
  isDeleted?: boolean;

  @Prop()
  deletedAt?: Date;
}

export const BooksSchema = SchemaFactory.createForClass(Books);
BooksSchema.plugin(softDeletePlugin);
