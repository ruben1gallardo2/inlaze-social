import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { environments } from './environments';
import { JwtStrategy } from './auth/jwt.strategy';
import { PostsModule } from './posts/posts.module';
import { APP_INTERCEPTOR } from '@nestjs/core';


@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: `${config.get<string>('MONGODB_URI')}/inlaze-social`, 
      })
    }),
    UsersModule,
    AuthModule,
    PostsModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV || '.env'],
      isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    JwtStrategy,
  ],
})
export class AppModule {}
