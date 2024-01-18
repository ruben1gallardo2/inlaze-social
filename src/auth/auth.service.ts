import { HttpException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login.dto';
import { RegisterAuthDto } from './dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schema/user.schema';
import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as jwt from "jsonwebtoken"
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private readonly userModule: Model<User>,
    private jwtAuthService: JwtService,
    private configService: ConfigService
  ) {}

  async register(registerAuthDto: RegisterAuthDto): Promise<User> {
    let hashed: string;
    let res
    let emailExist
    const { password } = registerAuthDto;
    console.log(registerAuthDto)
    try {
      hashed = await hash(password, 10);
    } catch (error) {
      console.log(error);
      return;
    }

    registerAuthDto = { ...registerAuthDto, password: hashed };

    try {
      emailExist = await this.userModule.findOne({ email: registerAuthDto.email })
    } catch (error) {
      console.log(error)
      throw new HttpException(error, 500)
    }
    
    if (emailExist) {
      throw new HttpException("Email ya existente", 400)
    }

    try {
      res = await this.userModule.create(registerAuthDto)
    } catch (error) {
      console.log(error)
      throw new HttpException(error, 500)
    }

    return res;
  }

  async login(loginAuthDto: LoginAuthDto): Promise<LoginResponse> {
    let userFound
    const { email, password } = loginAuthDto;

    try {
      userFound = await this.userModule.findOne({ email } );
    } catch (error) {
      console.log(error)
      throw new HttpException(error, 500)
    }

    if (!userFound) throw new HttpException("Usuario no encontrado", 400)
    await this.checkPassword(password, userFound.password)

    const { fullName, _id } = userFound 
    const payload = { id: _id, fullName }
    const token = this.jwtAuthService.sign(payload)

    const data = {
      user: { fullName, email },
      token
    }
    return data;
  }

  async checkPassword(password: string, encrypted: string): Promise<boolean> {
    let res

    try {
      res = await compare(password, encrypted)
    } catch (error) {
      console.log(error)
      throw new Error("Error inesperado")
    }

    if (!res) throw new HttpException("Contraseña incorrecta", 403)

    return res;
  }

  decodeToken(token: string) {
    return jwt.verify(token, this.configService.get<string>("JWT_SECRET"));    
  }
}

type LoginResponse = {
  user: { fullName: string, email: string },
  token: string
}
