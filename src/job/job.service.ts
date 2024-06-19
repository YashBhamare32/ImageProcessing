import { Headers, Injectable, Request } from '@nestjs/common';
import { JobDto } from './dto/job.dto';
import { Users } from 'src/auth/schemas/user.schema';
import { BlobService } from 'src/blob/blob.service';
import * as fs from "fs";

@Injectable()
export class JobService {
    constructor(private blobService : BlobService){}
    async createJob(image:Express.Multer.File , user:Users ,  headers:any){

        //convert to base64 encoding
        const buffer = await fs.promises.readFile(image.path);
        const base64Image = buffer.toString("base64");

        const token = headers.authorization.split(' ')[1];
        console.log(token);

        const res = await this.blobService.storeImage(token , base64Image);
        return res;
    } 
}
