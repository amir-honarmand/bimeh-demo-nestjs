import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Put } from '@nestjs/common/decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    const data = await this.usersService.createUser(createUserDto);
    return data;
  }

  @Get()
  findAllUser(): Promise<any> {
    return this.usersService.findAllUser();
  }

  @Get(':id')
  findOneUser(@Param('id') id: string): Promise<any> {
    return this.usersService.findOneUser(+id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<any> {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string): Promise<any> {
    return this.usersService.removeUser(+id);
  }
}
