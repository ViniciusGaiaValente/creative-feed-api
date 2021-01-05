import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Module, HttpException, HttpStatus } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PostRepository } from 'src/database/repositories/post.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomBytes } from 'crypto';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '..', '..', '..', 'assets'),
        filename: (req, file, callback) => {

          if (file.mimetype != 'image/png' && file.mimetype != 'image/jpg'  && file.mimetype != 'image/jpeg') {
            callback(new HttpException('only images with extentions: png, jpg and jpeg are allowed', HttpStatus.UNSUPPORTED_MEDIA_TYPE), null);
            return;
          }

          const customName = randomBytes(18).toString('hex');
          callback(null, `${Date.now()}-${customName}.png`);
          
        }
      }),
    }),
    TypeOrmModule.forFeature([
      PostRepository,
      UserEntity,
    ]),
  ],
  controllers: [
    PostController,
  ],
  providers: [
    PostService,
  ],
})
export class PostModule { }
