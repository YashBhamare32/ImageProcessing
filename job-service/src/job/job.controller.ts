import { Body, Controller, Get, Headers, Param, Post, Request, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { JobService } from './job.service';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';

const multerOptions: MulterOptions = {
    dest: 'tmp/',
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed!'), false);
      }
    },
  };

@Controller('job')
export class JobController {
    constructor(private jobService : JobService,
    ){}

    @UseGuards(AuthGuard)
    @Post('/')
    @UseInterceptors(FileInterceptor('image' , multerOptions))
    
    async createJob(@UploadedFile() image:Express.Multer.File , @Headers() headers:any){
        console.log("In job api");
                
        return this.jobService.createJob(image , headers);
    }


    @UseGuards(AuthGuard)
    @Get("/:id")
    async getJobStatus(@Param() params:any , @Res() res:Response){
        const id = params.id;
        console.log("in get job api");

        return this.jobService.getJobStatus(id , res);
    }
}