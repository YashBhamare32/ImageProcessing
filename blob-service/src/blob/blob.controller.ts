import { BadRequestException, Body, Controller, Get, Headers, NotFoundException, Param, Post, Request, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { BlobService } from './blob.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as fs from 'fs';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { EventPattern, Payload } from '@nestjs/microservices';

const multerOptions: MulterOptions = {
    dest: 'tmp/', // Set the destination for temporary uploaded files
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed!'), false);
      }
    },
  };

@Controller('blob')
export class BlobController {
    constructor(private blobService : BlobService){}

    @Post()
    // @UseInterceptors(FileInterceptor('image' , multerOptions))
    @EventPattern("job_created")
    async uploadImage(@Payload() req) {
        const token = req.token;
        const base64 = req.base64;
        console.log(token)
        return this.blobService.storeImage(base64 , token)
    }

    
    @Get("/:id")
    async getBlob(@Param() params:any , @Res() res : Response){
      const id = params.id;
      console.log(id+"From blob controller");
      return this.blobService.getBlob(id , res);
    }

}