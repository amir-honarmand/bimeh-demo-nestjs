import { QueryPaginationSearch } from "src/public-dto/query-pagination-search.dto";
import { QueryPagination } from "src/public-dto/query-pagination.dto";

export const paginationCalc = (pagination: QueryPaginationSearch | QueryPagination): page => {
    
    const page: number = +pagination.page || 1;
    const limit: number = 20;
    const skip: number = (page - 1) * limit;
    
    return {page, limit, skip};
}

interface page {
    page?: number;
    limit: number;
    skip: number;
}