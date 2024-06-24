import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as fs from "fs";
import * as crypto from "crypto";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

let jobIdCounter =1;
@Injectable()
export class BlobService {
    constructor(
        @InjectModel(Blob.name) private blobModel: Model<Blob>
    ){}
    
    async storeImage(base64Image:string , token:string){
        
        try {
            const newBlob = await this.blobModel.create({
                id:jobIdCounter++,
                base64Image,
                token,
                status : "PENDING"
            }); 
            return newBlob;

        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async getBlob(id:any){
        console.log(id);
        const blob = await this.blobModel.findOne({id});
        if(!blob){
            throw new NotFoundException("Blob not found!!");
        }
        return blob;
    }
}