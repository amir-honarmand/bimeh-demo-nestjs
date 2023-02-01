import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { UsersModule } from './users/users.module';
import { AllExceptionsFilter } from './utils/all-exceptions.filter';

@Module({
  imports: [
    /* dotEnv config */
    ConfigModule.forRoot({ isGlobal: true }),
    /* rateLimiter */
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 50
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ],
})
export class AppModule { }
