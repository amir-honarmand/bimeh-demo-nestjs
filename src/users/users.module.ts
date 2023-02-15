import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userModel } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { JwtStrategy } from './strategy/jwt.strategy';
import { DynamicModuleModule } from 'src/dynamicModule/dynamic-module.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository, JwtStrategy],
  imports: [
    DynamicModuleModule.getUrl('https://jsonplaceholder.typicode.com/todos/1'),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: userModel }]),
  ],
})
export class UsersModule {}
