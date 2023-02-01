import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";
import { QueryPaginationSearch } from "src/public-dto/query-pagination-search.dto";
import { paginationCalc } from "src/utils/paginationCalc";
import { ValidateUserDto } from "../dto/auth.dto";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";

export class UserRepository {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<Document> {
        const createUser = await this.userModel.create({
            email: createUserDto.email,
            mobile: createUserDto.mobile,
            password: createUserDto.password,
            salt: createUserDto.salt,
            wallet: createUserDto.wallet,
            avatar: createUserDto.avatar
        });
        if (!createUser) {
            throw new InternalServerErrorException('SAVING_FAILURE!');
        };

        return createUser;
    }

    async findAllUser(queryPaginationDto: QueryPaginationSearch): Promise<{rows: Document[], count: number}> {
        const { limit, skip } = paginationCalc(queryPaginationDto);
        const { sort, order } = queryPaginationDto;

        const regex = queryPaginationDto.search ? new RegExp(queryPaginationDto.search, 'i') : new RegExp('', 'i');

        const findAllUser = await this.userModel.find()
        .sort([[sort, order]])
        .select('-createdAt -updatedAt -__v -password -salt')
        .limit(limit)
        .skip(skip);

        const countUsers = await this.userModel.count();

        return {rows: findAllUser, count: countUsers};
    }

    async findUser(userEmail): Promise<any> {
        const findUser = await this.userModel.findOne({email: userEmail})
        .select('-createdAt -updatedAt -__v');

        if (!findUser) {
            throw new NotFoundException('NOT_FOUND!');
        };

        return findUser;
    }
}