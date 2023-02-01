import { InternalServerErrorException } from "@nestjs/common"

export const BaseErrorException = (data: object, success: boolean, msg: string, meta: object)=>{
    throw new InternalServerErrorException({
        data,
        success,
        msg,
        meta
    })
}