import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as fs from "fs";
import * as crypto from "crypto";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response } from 'express';

let jobIdCounter =1;
@Injectable()
export class BlobService {
    constructor(
        @InjectModel(Blob.name) private blobModel: Model<Blob>
    ){}
    
    async storeImage(base64:string , token:string){
        
        try {
            const newBlob = await this.blobModel.create({
                id:jobIdCounter++,
                base64,
                token,
                status : "PENDING"
            }); 
            return newBlob;

        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async getBlob(id:any , res:Response){
        console.log(id);
        try {
            const blob = await this.blobModel.findOne({ id });
            if (!blob) {
                return res.status(404).json({
                    msg: "Blob not found with given id",
                });
            }
            return res.status(200).json(blob);
        } catch (error) {
            return res.status(500).json({
                msg: 'An error occurred while retrieving the blob',
                error: error.message,
            });
        }
    }
}