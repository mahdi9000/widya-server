import { Controller, Get, Param } from '@nestjs/common';

// Entity
import { User } from 'src/database/entity/user.entity';

// DTO
import { FindByIdDto } from 'src/common/dto';

// Service
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOneById(@Param() id: FindByIdDto): Promise<User> {
    return await this.userService.findOneById(id);
  }
}
