import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy';
import { secret } from 'src/config/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/database/repositories/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
    ]),
    JwtModule.register({
      secret: secret,
      signOptions: {
        expiresIn: '1h',
      }
    }),
    PassportModule.register({defaultStrategy: 'jwt'})
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  exports: [
    PassportModule,
    JwtModule,
  ]
})
export class AuthModule { }
