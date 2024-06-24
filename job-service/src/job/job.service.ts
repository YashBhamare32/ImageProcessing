import { Headers, Inject, Injectable, NotFoundException, Request } from '@nestjs/common';
// import { JobDto } from './dto/job.dto';
// import { Users } from 'src/auth/schemas/user.schema';
// import { BlobService } from 'src/blob/blob.service';
import * as fs from "fs";
import { InjectModel } from '@nestjs/mongoose';
// import { Blob, blobSchema } from 'src/auth/schemas/blob.schema';
import { Model } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';
import {HttpService } from "@nestjs/axios";
import { lastValueFrom } from 'rxjs';

@Injectable()
export class JobService {
    constructor(@Inject("BLOB_SERVICE") private readonly blobServiceClient : ClientProxy,
    private readonly httpService : HttpService
    
){}
    async createJob(image:Express.Multer.File , headers:any){

        //convert to base64 encoding
        const buffer = await fs.promises.readFile(image.path);
        const base64Image = buffer.toString("base64");

        const token = headers.authorization.split(' ')[1];
        console.log(token);
        const res = await lastValueFrom(
            this.httpService.post('http://localhost:3002/blob', { base64Image, token })
          );
        console.log(res.data);
        return res.data;
        // const res = await this.blobService.storeImage(token , base64Image);

        // await fs.promises.unlink(image.path);
    } 

    async getJob(id:any){
        // const id = params.id;
        // const job:Blob = await this.blobModel.findOne({id});
        // if(!job){
        //     throw new NotFoundException("Job not found in db");
        // }
        // console.log(job);
        // return {
        //     id: job.id,
        //     status:job.status
        // };

        return this.blobServiceClient.send({cmd: 'getBlob'} , id).toPromise();
    }
}