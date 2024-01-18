import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schema/post.schema';
import { Model } from 'mongoose';
import { User } from 'src/users/schema/user.schema';

@Injectable()
export class PostsService {

  constructor (
    @InjectModel(Post.name)
    private postModule: Model<PostDocument>
  ) {}

  async create(createPostDto: CreatePostDto, user: User) {
    let res
    const userId = user._id
    try {
      res = await this.postModule.create(
        {
          ...createPostDto,
          userId
        }
      )
    } catch (error) {
      console.log(error)
      throw new HttpException(error, 500)
    }

    return res;
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
