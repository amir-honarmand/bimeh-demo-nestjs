import { Injectable, ForbiddenException, ServiceUnavailableException, InternalServerErrorException } from '@nestjs/common';
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
    // check mobile numbers validation
    
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

  async updateUserWallet(id: string, updateUserDto: UpdateUserDto): Promise<boolean> {
    // persian numbers check
    
    const amount: number = Number(updateUserDto.wallet);
    if(!amount || isNaN(amount)) throw new InternalServerErrorException('amount is NaN!');
    
    await this.UserRepository.updateUserWallet(id, amount);
    
    return true;
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
