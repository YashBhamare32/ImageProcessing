import { ClientProxy } from '@nestjs/microservices';
import { HttpService } from "@nestjs/axios";
import { Response } from 'express';
export declare class JobService {
    private readonly blobServiceClient;
    private readonly httpService;
    constructor(blobServiceClient: ClientProxy, httpService: HttpService);
    createJob(image: Express.Multer.File, headers: any): Promise<any>;
    getJobStatus(id: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
