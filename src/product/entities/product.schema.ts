import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { StorageEtt } from 'src/storage/entities/storage.entity';
export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  name: string;
  @Prop()
  photo: string;

  @Prop()
  group: string;

  @Prop()
  lastPurchase: Date;

  @Prop()
  qtt: number;

  @Prop()
  minimum: number;

  @Prop()
  available: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Storage',
    required: false,
  })
  storage: StorageEtt;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
