import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as fs from "fs";
import * as crypto from "crypto";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blob } from 'src/auth/schemas/blob.schema';

@Injectable()
export class BlobService {
    constructor(
        @InjectModel(Blob.name) private userModel: Model<Blob>
    ){}
    
    async storeImage(token:string , base64Image:string){
        try {
            const newBlob = await this.userModel.create({
                token,
                base64Image,
                status : "PENDING"
            }); 
            return newBlob;

        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}
