import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PostRepository } from 'src/database/repositories/post.repository';
import { CreatePostDto } from 'src/dto/post/post.create-post.dto';
import { UserEntity } from 'src/database/entities/user.entity';
import { PostEntity } from 'src/database/entities/post.entity';
import { FileDto } from 'src/dto/post/post.file.dto';
import { unlink } from 'fs';
import { join } from 'path';


@Injectable()
export class PostService {
  
  constructor(
    private readonly repo: PostRepository,
  ) {}

  public async createNewPost(userEntity: UserEntity, createPostDto: CreatePostDto, uploadedFiles: FileDto[]): Promise<PostEntity> {

    const { posts, ...rawUser } = userEntity;

    if (posts) {
      posts.forEach((post) => {
        if (post.title == createPostDto.title) {
          throw new HttpException('Post titles must be unique for each user.', HttpStatus.CONFLICT);
        }
      });
    }

    const files: string[] = uploadedFiles.map<string>((value) => {
      return value.filename;
    })

    const post = this.repo.create({ ...createPostDto, user: rawUser, images: files });
    return await this.repo.save(post);
  }

  public async deletePost(id: string, userId: string): Promise<PostEntity> {
    const post = await this.repo.findOne(id, { relations: [ 'user' ] });
    
    if(!post) {
      throw new HttpException('Post not found.', HttpStatus.BAD_REQUEST);
    }

    if(post.user.id != userId) {
      throw new HttpException('Posts can only be deleted by their owners.', HttpStatus.UNAUTHORIZED);
    }

    post.images.forEach(async (fileName) => {
      await unlink(join(__dirname, '../', '../', '../', 'assets', fileName), (err) => {  });
    })

    await this.repo.remove(post);
    return post;
  }

}
