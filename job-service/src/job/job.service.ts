import { Headers, Inject, Injectable, NotFoundException, Request } from '@nestjs/common';
import * as fs from "fs";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';
import {HttpService } from "@nestjs/axios";
import { lastValueFrom } from 'rxjs';
import { AxiosRequestConfig } from 'axios';
import { Response } from 'express';

@Injectable()
export class JobService {
    constructor(@Inject("JOB_SERVICE") private readonly blobServiceClient : ClientProxy,
    private readonly httpService : HttpService
    
){}
    async createJob(image:Express.Multer.File , headers:any){

        //convert to base64 encoding
        const buffer = await fs.promises.readFile(image.path);
        const base64 = buffer.toString("base64");

        const token = headers.authorization.split(' ')[1];
        console.log(token);

        const config: AxiosRequestConfig = {
            url : "http://localhost:3002/api/v1/blob",
            method : "post",
            data : {base64 , token},
          };
        try {
            // const res = await this.httpService.axiosRef.request(config);
            // console.log(res.data);
            const res = await this.blobServiceClient.emit("job_created" , {base64 , token});
            console.log(res);
            return res;
        } catch (error) {
            throw new Error(error);
        }
    } 

    async getJobStatus(id:any , res:Response){
        console.log(id);
        const config: AxiosRequestConfig = {
            url : "http://localhost:3002/api/v1/blob/"+id,
            method : "get",
          };
        try {
            const resp = await this.httpService.axiosRef.request(config);
            console.log(resp.data);
            return res.json({
                "JobId" : id,
                "status":resp.data.status
            });
        } catch (error) {
            console.log(res);
            return res.json({
                "Msg":"Job not found",
                "error":error
            })
        }
    }
}