import { BadRequestException, Controller, Get, NotFoundException, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BlobService } from './blob.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

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
    @UseInterceptors(FileInterceptor('image' , multerOptions))
    async uploadImage(@UploadedFile() image: Express.Multer.File) {
        
    }


    @Get("/:id")
    async getBlob(@Param() params:any){
      return this.blobService.getBlob(params);
    }

}