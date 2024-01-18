import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModule: Model<UserDocument>,
  ) {}

  async findAll() {
    let res;

    try {
      res = await this.userModule.find({ isDeleted: false });
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }

    if (!res) throw new HttpException('No se encontraron usuarios', 400);

    return res;
  }
  
  async findOne(id: string) {
    let resp;

    try {
      resp = await this.userModule.findById(id, { isDeleted: false });
    } catch (error) {
      throw new HttpException(error, 500);
    }

    if (!resp) throw new HttpException('Usuario no encontrado', 400);

    return resp;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let resp;

    try {
      resp = await this.userModule.findOneAndUpdate(
        { _id: id },
        updateUserDto,
        {
          new: true,
        },
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }

    if (!resp) throw new HttpException('Usuario no encontrado', 400);

    return resp;
  }

  //soft delete aplicado
  async remove(id: string) {
    let resp 
    console.log(id)
    try {
      resp = await this.userModule.findByIdAndUpdate({ _id: id }, { isDeleted: true, deletedAt: new Date() }, { new: true })
    } catch (error) {
      console.log(error)
      throw new HttpException(error, 500)
    }

    if(!resp) throw new HttpException("Usuario no encontrado", 400)

    return resp;
  }
}
