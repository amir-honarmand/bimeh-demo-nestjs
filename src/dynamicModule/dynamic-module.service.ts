import { Inject, Injectable } from '@nestjs/common';
import { AxiosHttpService } from './http-module';

@Injectable()
export class DynamicModuleService {
    constructor(
        @Inject('GET_URL') private url: string,
        private axiosHttpService: AxiosHttpService,
    ){}

    async requestToUrl(): Promise<void>{
        const url: string = this.url;

        const res = await this.axiosHttpService.sendRequest(url);
        
        console.log(res);
    }
}
