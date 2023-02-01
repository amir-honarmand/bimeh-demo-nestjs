import { InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";

export class UserRepository {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<Document> {
        const createUser = await this.userModel.create(createUserDto);
        if (!createUser) {
            throw new InternalServerErrorException('SAVING_FAILURE!');
        };

        return createUser;
    }
}