import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AxiosHttpService {
    constructor(
        private httpService: HttpService,
    ) { }

    private headers = {
        "Content-Type": "application/json",
    };

    async sendRequest(url: string): Promise<object> {
        const createRequest = await this.httpService.axiosRef({
            method: "get",
            url,
            headers: this.headers,
        })

        return createRequest.data;
    }
}