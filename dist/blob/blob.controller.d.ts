/// <reference types="multer" />
import { BlobService } from './blob.service';
export declare class BlobController {
    private blobService;
    constructor(blobService: BlobService);
    uploadImage(image: Express.Multer.File): Promise<void>;
}
