import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

// Service
import { ProductService } from './product.service';

// Guard
import JwtAuthenticationGuard from '../auth/guard/jwt.guard';

// Entity
import { Product } from 'src/database/entity/product.entity';

// DTO
import { FindByIdDto } from 'src/common/dto';
import { CreateProductDto } from './dto';

// Interface
import { IRequestWithUser } from '../auth/interface/request-with-user.interface';
import { DeleteResult } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
@UseGuards(JwtAuthenticationGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Post()
  async create(
    @Req() user: IRequestWithUser,
    @Body() createDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productService.create(user, createDto);
  }

  @Get(':id')
  async findOneById(@Param() id: FindByIdDto): Promise<Product> {
    return await this.productService.findOneById(id);
  }

  @Patch(':id')
  async updateOneById(
    @Req() user: IRequestWithUser,
    @Param() id: FindByIdDto,
    @Body() updateDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productService.updateOneById(user, id, updateDto);
  }

  @Delete(':id')
  async deleteOneById(
    @Req() user: IRequestWithUser,
    @Param() id: FindByIdDto,
  ): Promise<DeleteResult> {
    return await this.productService.deleteOneById(user, id);
  }
}
