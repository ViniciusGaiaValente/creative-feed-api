import { Controller, Post, Body, HttpCode, HttpStatus, UseInterceptors, ClassSerializerInterceptor, Req, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dto/auth/auth.login.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UserEntity } from 'src/database/entities/user.entity';
import { RegisterDto } from 'src/dto/auth/auth.register.dto';
import { ResponseTokenDto } from 'src/dto/auth/auth.response-token.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController { 

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 201, type: UserEntity, description: 'Register a new user.' })
  @ApiTags('Auth')
  public async register(@Body() registerDto: RegisterDto): Promise<UserEntity> {
    return  await this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, type: ResponseTokenDto, description: 'Return a token used to autenticato protected routes.' })
  @ApiTags('Auth')
  public async login(@Body() loginDto: LoginDto): Promise<ResponseTokenDto> {
    return await this.authService.login(loginDto);
  }

  @Delete('unregister')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'Removes the logged user and all of his posts.' })
  @ApiTags('Auth')
  public async unregister(@Req() req: { user: UserEntity }) {
    return await this.authService.unregister(req.user);
  }

}
