import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as fs from "fs";
import * as crypto from "crypto";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response } from 'express';
import { BlobSchema } from './schemas/blob.schema';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";


@Injectable()
export class BlobService {
    constructor(
        @InjectRepository(BlobSchema) private readonly blobRepository: Repository<BlobSchema>,
    ){}
    
    async storeImage(base64:string , token:string){
        
        try {
            //fetch all entries and get its count to assign a unique id

            console.log(token)

            const newBlob = await this.blobRepository.save({
                token,
                base64,
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
            const blob = await this.blobRepository.findOneBy({ id });
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