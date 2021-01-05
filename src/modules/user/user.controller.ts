import { Controller, Get, Param, ClassSerializerInterceptor, UseInterceptors, HttpStatus, HttpCode } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../../database/entities/user.entity';

@Controller('users')
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) {}

  @Get('getUser/:username')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: UserEntity, description: 'Return the user with the given id.' })
  @ApiTags('Users')
  public async getUser(@Param('username') username: string): Promise<UserEntity> {
    return await this.userService.getUser(username);
  }

}