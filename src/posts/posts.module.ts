import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schema/post.schema';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema
      }
    ])
  ],
  controllers: [PostsController],
  providers: [
    PostsService, 
  ],
})
export class PostsModule {}
