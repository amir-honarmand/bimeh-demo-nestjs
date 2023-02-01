import { IsOptional, IsString } from "class-validator";

export class QueryPagination {
    @IsOptional()
    @IsString()
    page: string;
}