import { Injectable } from '@nestjs/common';
export type User = any;
@Injectable()
export class UsersService {
    private readonly users = [
        {
          userId: 1,
          email: 'yessine@gmail.com',
          password: '123456',
        },
        {
          userId: 2,
          email: 'aymen@gmail.com',
          password: 'guess',
        },
      ];
    
      async findOne(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
      }
}
