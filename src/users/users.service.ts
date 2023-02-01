import { Injectable, ForbiddenException, ServiceUnavailableException } from '@nestjs/common';
import { QueryPaginationSearch } from 'src/public-dto/query-pagination-search.dto';
import { ValidateUserDto } from './dto/auth.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repository';
import {validate, generate} from '../utils/password';
import { JwtService } from '@nestjs/jwt';
import { checkImageUpload } from 'src/utils/check-image-upload';

@Injectable()
export class UsersService {
  constructor(
    private readonly UserRepository: UserRepository,
    private jwtService: JwtService,

  ){}

  async login(validateUserDto: ValidateUserDto): Promise<object> {
    const email: string = validateUserDto.email.toLowerCase();
    const password: string = validateUserDto.password;
    
    const user = await this.UserRepository.findUser(email);
    if(user.isBlock){
      throw new ForbiddenException('you are blocked!');
    };
    
    const checkPassword = await validate(password, user.salt, user.password);
    if(!checkPassword){
      throw new ServiceUnavailableException('email or password incorrect!');
    };

    const token = await this.jwtSign(user.id);

    return { token, userId: user.id, hasRegistered: true, /* role: user.role */ };
  }
  
  async createUser(createUserDto: CreateUserDto): Promise<boolean> {
    createUserDto = checkImageUpload(createUserDto, undefined, 'users');

    const passwordHash = await generate(createUserDto.password);
    createUserDto.password = passwordHash.hash;
    createUserDto.salt = passwordHash.salt;

    
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

  async jwtSign(userId: string): Promise<string> {
    const jwt = await this.jwtService.signAsync(
      { userId },
      { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRES }
    );

    return jwt;
  };

  async validateUser(payload: any): Promise<any> {
    return await this.UserRepository.findUser(payload?.id);
}
}
