import { IsOptional, IsString, MaxLength, IsIn } from "class-validator";
import { SortOrder } from "mongoose";

export class QueryPaginationSearch {
    @IsOptional()
    @IsString()
    @MaxLength(200)
    search: string;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    page: string;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    @IsIn(['desc', 'asc'])
    order?: SortOrder = 'desc';

    @IsOptional()
    @IsString()
    @MaxLength(200)
    sort?: string = 'createdAt';
}