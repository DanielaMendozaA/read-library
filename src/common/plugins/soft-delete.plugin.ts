import { Schema, Document, Query } from 'mongoose';

export interface ISoftDeleteDocument extends Document {
  isDeleted?: boolean;
  deletedAt?: Date;
}

export function softDeletePlugin(schema: Schema) {
  // Agregar los campos isDeleted y deletedAt al esquema
  schema.add({
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  });

  schema.pre<Query<any, ISoftDeleteDocument>>('find', function() {
    this.where({ isDeleted: false });
  });

  schema.pre<Query<any, ISoftDeleteDocument>>('findOne', function() {
    this.where({ isDeleted: false });
  });

  schema.pre<Query<any, ISoftDeleteDocument>>('findOneAndUpdate', function() {
    this.where({ isDeleted: false });
  });

  schema.methods.softDelete = async function() {
    this.isDeleted = true;
    this.deletedAt = new Date();
    await this.save();
  };

  schema.methods.restore = async function() {
    this.isDeleted = false;
    this.deletedAt = null;
    await this.save();
  };
}
