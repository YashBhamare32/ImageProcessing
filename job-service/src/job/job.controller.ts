import { Body, Controller, Get, Headers, Param, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JobDto } from './dto/job.dto';
import { Users } from 'src/auth/schemas/user.schema';
import { AuthGuard } from 'src/auth/auth.gaurd';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { JobService } from './job.service';
import { BlobService } from 'src/blob/blob.service';

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

@Controller('job')
export class JobController {
    constructor(private jobService : JobService,
        private blobService : BlobService
    ){}

    @UseGuards(AuthGuard)
    @Post('/')
    @UseInterceptors(FileInterceptor('image' , multerOptions))
    async createJob(@UploadedFile() image:Express.Multer.File , @Request() req , @Headers() headers:any){
        console.log("In job api");

        const user = req.user as Users;
        
        return this.jobService.createJob(image , user , headers);
    }


    @UseGuards(AuthGuard)
    @Get("/:id")
    async getJob(@Param() param:any){
        console.log("in get job api");

        return this.jobService.getJob(param);
    }
}