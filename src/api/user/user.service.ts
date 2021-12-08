import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entity
import { User } from 'src/database/entity/user.entity';

// DTO
import { SignUpDto } from '../auth/dto';
import { FindByIdDto } from '../../common/dto/find-by-id.dto';
import { FindByEmailDto, FindByEmailOrUsernameDto } from './dto';

// Error handler
import { CustomNotFoundException } from 'src/common/exception/not-found.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(signUpDto: SignUpDto): Promise<User> {
    const user = this.userRepo.create(signUpDto);

    return await this.userRepo.save(user);
  }

  async findOneById({ id }: FindByIdDto): Promise<User> {
    const user = await this.userRepo.findOne({ id });

    if (!user) throw new CustomNotFoundException('User', id);

    return user;
  }

  async findOneByEmail({ email }: FindByEmailDto): Promise<User> {
    return await this.userRepo.findOne({ email });
  }

  async findOneByEmailOrUsername({
    email,
    username,
  }: FindByEmailOrUsernameDto): Promise<User> {
    return await this.userRepo
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .orWhere('user.username = :username', { username })
      .getOne();
  }
}
