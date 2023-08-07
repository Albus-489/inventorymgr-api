import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StorageService } from './storage.service';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post()
  create(@Body() createStorageDto: CreateStorageDto) {
    return this.storageService.create(createStorageDto);
  }

  @Get()
  findAll() {
    return this.storageService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.storageService.findOne(id);
  // }

  @Get(':id')
  findOneWithPagination(@Param('id') id: string, @Query('page') page: number, @Query('limit') limit: number) {
    return this.storageService.findOneWithPagination(id, page, limit);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStorageDto: CreateStorageDto) {
    return this.storageService.update(id, updateStorageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storageService.remove(id);
  }
}
