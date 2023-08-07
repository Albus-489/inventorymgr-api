import { ProductEtt } from 'src/product/entities/product.entity';

export class StorageEtt {
  constructor(name, description = '') {
    this.name = name;
    this.description = description;
    this.products = [];
  }

  name: string;
  description: string;
  products: string[];
}
