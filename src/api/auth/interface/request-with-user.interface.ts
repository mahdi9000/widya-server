import { User } from 'src/database/entity/user.entity';

export interface IRequestWithUser extends Request {
  user: User;
}
