import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    catch(exception: unknown, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;
        let httpStatus: number;
        let message: string;
        let errors: object;
        let errorName: string;

        const ctx = host.switchToHttp();

        if (exception instanceof HttpException) {
            httpStatus = exception.getStatus();
            message = exception['response']['msg'] || exception['message'];
            errors = exception['errors'] || exception['response'] || {};
            errorName = exception['name'];
            
        } else if(exception['code'] && exception['code'] === 11000) {
            /* 
            * duplicate data error exception in DB
            */
            httpStatus = HttpStatus.CONFLICT;
            message = 'DUPLICATE_DATA';

        }else if(exception['name'] && exception['name'] === 'ValidationError'){
            /* 
            * validation error exception in DB
            */
            httpStatus = HttpStatus.BAD_REQUEST;
            message = exception['_message'];
            errors = exception['errors'] || {};
            errorName = exception['name'];

        }else if(exception['name'] && exception['name'] === 'MongoServerError'){
            /* 
            * mongo server error exception in DB
            */
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
            message = exception['message'];

        }else{
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
            message = message = exception['message'] || exception['response']['message'] || 'INTERNAL_SERVER_ERROR';
        };

        const responseBody = {
            statusCode: httpStatus,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
            message,
            errors,
            errorName
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
