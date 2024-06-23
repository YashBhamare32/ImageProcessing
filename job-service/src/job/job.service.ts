import { Headers, Inject, Injectable, NotFoundException, Request } from '@nestjs/common';
// import { JobDto } from './dto/job.dto';
// import { Users } from 'src/auth/schemas/user.schema';
// import { BlobService } from 'src/blob/blob.service';
import * as fs from "fs";
import { InjectModel } from '@nestjs/mongoose';
// import { Blob, blobSchema } from 'src/auth/schemas/blob.schema';
import { Model } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class JobService {
    constructor(@Inject("BLOB_SERVICE") private readonly blobServiceClient : ClientProxy){}
    async createJob(image:Express.Multer.File , user:Users ,  headers:any){

        //convert to base64 encoding
        const buffer = await fs.promises.readFile(image.path);
        const base64Image = buffer.toString("base64");

        const token = headers.authorization.split(' ')[1];
        console.log(token);

        // const res = await this.blobService.storeImage(token , base64Image);

        // await fs.promises.unlink(image.path);
        return this.blobServiceClient.send({ cmd : "storeImage" } , {token , base64Image}).toPromise();
    } 

    async getJob(params:any){
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

        return this.blobServiceClient.send({cmd: 'getBlob'} , {params}).toPromise();
    }
}