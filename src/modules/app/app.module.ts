import { PostModule } from './../post/post.module';
import { AssetsModule } from '../assets/assets.module';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../database/entities/user.entity';
import { dbConfig } from '../../config/constants'
import { PostEntity } from 'src/database/entities/post.entity';

@Module({
  imports: [
    TypeOrmModule
      .forRoot({
        ...dbConfig,
        type: 'postgres',
        synchronize: true,
        entities: [
          UserEntity,
          PostEntity,
        ],
      }),
    AssetsModule,
    AuthModule,
    UserModule,
    PostModule,
  ],
})
export class AppModule { }
