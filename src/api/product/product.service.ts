import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

// Entity
import { Product } from 'src/database/entity/product.entity';

// Interface
import { IRequestWithUser } from '../auth/interface/request-with-user.interface';

// DTO
import { CreateProductDto } from './dto';
import { FindByIdDto } from 'src/common/dto';
import { CustomNotFoundException } from 'src/common/exception/not-found.exception';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async create(
    { user }: IRequestWithUser,
    createDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productRepo.save({
      ...createDto,
      userId: user.id,
    });
  }

  async findOneById({ id }: FindByIdDto): Promise<Product> {
    const product = await this.productRepo.findOne({ id });

    if (!product) throw new CustomNotFoundException('Product', id);

    return product;
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepo.find();
  }

  async updateOneById(
    { user }: IRequestWithUser,
    id: FindByIdDto,
    updateDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOneById(id);

    if (product.userId !== user.id)
      throw new ForbiddenException(
        'Modifying another user product is forbidden',
      );

    return await this.productRepo.save({
      ...product,
      ...updateDto,
    });
  }

  async deleteOneById(
    { user }: IRequestWithUser,
    id: FindByIdDto,
  ): Promise<DeleteResult> {
    const product = await this.findOneById(id);

    if (product.userId !== user.id)
      throw new ForbiddenException(
        'Deleting another user product is forbidden',
      );

    return await this.productRepo.delete({ id: id.id });
  }
}
