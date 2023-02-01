import { Injectable } from '@nestjs/common';
import { Document } from 'mongoose';
import { QueryPaginationSearch } from 'src/public-dto/query-pagination-search.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly UserRepository: UserRepository
  ){}
  
  async createUser(createUserDto: CreateUserDto): Promise<boolean> {
    await this.UserRepository.createUser(createUserDto);

    return true;
  }

  async findAllUser(queryPaginationDto: QueryPaginationSearch): Promise<object> {
    return await this.UserRepository.findAllUser(queryPaginationDto);
  }

  async findOneUser(id: number): Promise<any> {
    return `This action returns a #${id} user`;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    return `This action updates a #${id} user`;
  }

  async removeUser(id: number): Promise<any> {
    return `This action removes a #${id} user`;
  }
}
