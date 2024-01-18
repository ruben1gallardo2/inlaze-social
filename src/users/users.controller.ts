import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async findAll() {
    let res

    try {
      res = await this.usersService.findAll();
    } catch (error) {
      console.log(error)
      return error
    }

    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    let res
    try {
      res = await this.usersService.findOne(id);
    } catch (error) {
      console.log(error)
      return error
    }
    
    return res
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    let res

    try {
      res = await this.usersService.update(id, updateUserDto);
    } catch (error) {
      console.log(error)
      return error;
    }

    return res
  }

  @Patch('remove/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
