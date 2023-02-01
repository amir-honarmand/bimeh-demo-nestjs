import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userModel } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: userModel }]),
  ],
})
export class UsersModule {}
