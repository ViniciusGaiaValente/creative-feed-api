import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserRepository } from 'src/database/repositories/user.repository';
import { UserEntity } from 'src/database/entities/user.entity';

@Injectable()
export class UserService {

  constructor(private readonly repo: UserRepository) {}

  public async getUser(username: string): Promise<UserEntity> { 
    return await this.repo.findOne({ username }, {relations: [ 'posts' ]});
  }

}