import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { LoginDto } from 'src/dto/auth/auth.login.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from 'src/dto/auth/auth.register.dto';
import { UserEntity } from 'src/database/entities/user.entity';
import { UserRepository } from 'src/database/repositories/user.repository';
import { ResponseTokenDto } from 'src/dto/auth/auth.response-token.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async register(registerDto: RegisterDto): Promise<UserEntity> { 
    if (await this.userRepo.findOne({email: registerDto.email})) {
      throw new HttpException("This email has already been registered by another user.", HttpStatus.CONFLICT);
    }

    if (await this.userRepo.findOne({username: registerDto.username})) {
      throw new HttpException("This username has already been registered by another user.", HttpStatus.CONFLICT);
    }

    const userEntity = this.userRepo.create(registerDto);

    return this.userRepo.save(userEntity);
  }

  public async login(loginDto: LoginDto): Promise<ResponseTokenDto> {
    const user = await this.userRepo.findOne({ username: loginDto.username });

    if(!user || !user.comparePassword(loginDto.password)) {
      throw new HttpException("Wrong username or password.", HttpStatus.UNAUTHORIZED);
    }

    const authTokenDto = new ResponseTokenDto();
    authTokenDto.token = await this.jwtService.sign({ username: user.username });

    return authTokenDto;
  }

  public async unregister(user: UserEntity) {
    await this.userRepo.remove(user);
  }
  
}
