import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly UserRepository: UserRepository
  ){}
  
  async createUser(createUserDto: CreateUserDto): Promise<any> {
    
    
    const createUser = await this.UserRepository.createUser(createUserDto);

    return createUser;
  }

  async findAllUser(): Promise<any> {
    return `This action returns all users`;
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
