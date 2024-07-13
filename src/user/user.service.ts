import { Injectable } from '@nestjs/common';
import { RolesEnum } from '../auth/decorators/roles.decorator';

interface User {
  userId: number;
  username: string;
  password: string;
  role: RolesEnum[];
}

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'artur',
      password: '1111',
      role: [RolesEnum.ROLE_ADMIN, RolesEnum.ROLE_USER],
    },
    {
      userId: 2,
      username: 'user',
      password: '0000',
      role: [RolesEnum.ROLE_USER],
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => (user.username = username));
  }
}
