import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Storage, StorageDocument } from './entities/storage.schema';
import { StorageEtt } from './entities/storage.entity';
import { Product, ProductDocument } from 'src/product/entities/product.schema';

@Injectable()
export class StorageService {
  constructor(
    @InjectModel(Storage.name) private storageModel: Model<StorageDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  create(createStorageDto: CreateStorageDto) {
    let newStorage = new StorageEtt(
      createStorageDto.name,
      createStorageDto.description,
    );
    return this.storageModel.create(newStorage);
  }

  findAll() {
    return this.storageModel.find().exec();
  }

  findOne(id: string) {
    return this.storageModel.findById(id).populate('products').exec();
  }

  async findOneWithPagination(id: string, page: number, limit: number) {
    page = page || 1;
    limit = limit || 5;
    const skip = (page - 1) * limit;

    const storage = await this.storageModel.findById(id).exec();

    if (!storage) {
        throw new NotFoundException(`Storage with id ${id} not found.`);
    }

    const products = await this.productModel.find({ storage: id }).skip(skip).limit(limit).exec();

    return {
        ...storage.toObject(),
        products,
    };
}


  update(id: string, updateStorageDto: CreateStorageDto) {
    return this.storageModel
      .findByIdAndUpdate(id, updateStorageDto, {
        new: true,
        useFindAndModify: false,
      })
      .then((updatedStorage) => {
        console.log('Updated storage:', updatedStorage);
        return updatedStorage;
      });
  }

  async remove(storageId: string) {
    // Отримання інформації про склад
    const storage = await this.storageModel.findById(storageId);

    // Перевірка, чи існує склад
    if (!storage) {
      throw new Error('Склад не знайдено');
    }

    // Видалення складу
    await this.storageModel.findByIdAndDelete(storageId);

    // Видалення продуктів, пов'язаних зі складом
    await this.productModel.deleteMany({ storage: storageId });

    return { deletedStorage: storage.name, deletedProducts: storage.products }; // Повернення назви видаленого складу з його товарами
  }
}
