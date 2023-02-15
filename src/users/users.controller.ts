import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Put } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer";
import { editImageName } from 'src/utils/image-upload-edit-filename';
import { imageFileFilter } from 'src/utils/image-upload.filter';
import { BaseErrorException } from 'src/utils/error-handler';
import { QueryPaginationSearch } from 'src/public-dto/query-pagination-search.dto';
import { ValidateUserDto } from './dto/auth.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        filename: editImageName,
        destination: './files/users/avatars'
      }),
      fileFilter: imageFileFilter,
      limits: {fileSize: 2000000} // 2MB
    })
  )
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    const data = await this.usersService.createUser(createUserDto);
    if (!data) {
      BaseErrorException(
        {},
        false,
        'OPERATION_FAILURE',
        {}
      );
    };

    return {
      success: true,
      msg: 'OPERATION_COMPLETE',
      status: 201,
      meta: {}
    };
  }

  @Get()
  async findAllUser(@Query() queryPaginationDto: QueryPaginationSearch): Promise<any> {
    const data = await this.usersService.findAllUser(queryPaginationDto);
    if (!data) {
      BaseErrorException(
        {},
        false,
        'OPERATION_FAILURE',
        {}
      );
    };

    return {
      data,
      success: true,
      msg: 'OPERATION_COMPLETE',
      status: 200,
      meta: {}
    };
  }

  // @UsePipes(ValidationPipe)
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.User)
  @Put(':id')
  async updateUserWallet(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<any> {
    const data = await this.usersService.updateUserWallet(id, updateUserDto);
    if (!data) {
      BaseErrorException(
        {},
        false,
        'OPERATION_FAILURE',
        {}
      );
    };

    return {
      success: true,
      msg: 'OPERATION_COMPLETE',
      status: 200,
      meta: {}
    };
  
  }

  @Post('/auth/login')
  async login(@Body() validateUserDto: ValidateUserDto): Promise<any> {
    const data = await this.usersService.login(validateUserDto);
    if (!data) {
      BaseErrorException(
        {},
        false,
        'OPERATION_FAILURE',
        {}
      );
    };

    return {
      data,
      success: true,
      msg: 'OPERATION_COMPLETE',
      status: 201,
      meta: {}
    };
  }
  
  @Get('/data/from/url')
  async sendRequestToUrl(): Promise<any> {
    const data = await this.usersService.sendRequestToUrl();
    if (!data) {
      BaseErrorException(
        {},
        false,
        'OPERATION_FAILURE',
        {}
      );
    };

    return {
      data,
      success: true,
      msg: 'OPERATION_COMPLETE',
      status: 200,
      meta: {}
    };
  }
}
