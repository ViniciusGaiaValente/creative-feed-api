import { Controller, Post, UseGuards, HttpCode, HttpStatus, Request, Body, UseInterceptors, UploadedFiles, Delete, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { PostService } from './post.service';
import { PostEntity } from 'src/database/entities/post.entity';
import { CreatePostDto } from 'src/dto/post/post.create-post.dto';
import { FileDto } from 'src/dto/post/post.file.dto';
import { UserEntity } from 'src/database/entities/user.entity';

@Controller('posts')
export class PostController {
  
  constructor(
    private readonly service: PostService,
  ) {}

  @Post('createNewPost')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, type: PostEntity, description: 'Create a new post.' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(AnyFilesInterceptor())
  @ApiTags('Posts')
  public async createNewPost(@Request() req: { user: UserEntity }, @Body() createPostDto: CreatePostDto, @UploadedFiles() uploadedFiles: Array<FileDto>): Promise<PostEntity> {
    return await this.service.createNewPost(req.user, createPostDto, uploadedFiles);
  }

  @Delete('deletePost/:id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, type: PostEntity, description: 'Delete a post.' })
  @ApiTags('Posts')
  public async deletePost(@Request() req: { user: UserEntity }, @Param() id): Promise<PostEntity> {
    return await this.service.deletePost(id, req.user.id);
  }

}
