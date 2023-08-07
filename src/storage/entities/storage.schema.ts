import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ProductEtt } from 'src/product/entities/product.entity';
export type StorageDocument = Storage & Document;

@Schema()
export class Storage {
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    required: false,
  })
  products: ProductEtt[];
}

export const StorageSchema = SchemaFactory.createForClass(Storage);
