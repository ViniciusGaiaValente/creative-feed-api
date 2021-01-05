import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { secret } from 'src/config/constants';
import { UserRepository } from 'src/database/repositories/user.repository';
import { PayloadDto } from 'src/dto/auth/auth.payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userRepo: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });
  }

  async validate(authPayloadDto: PayloadDto) {
    const user = await this.userRepo.findOne({ username: authPayloadDto.username }, { relations: [ 'posts' ] });

    if (!user) {
      throw new HttpException('Invalid token.', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
  
}