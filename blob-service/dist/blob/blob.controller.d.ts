import { BlobService } from './blob.service';
import { Response } from 'express';
export declare class BlobController {
    private blobService;
    constructor(blobService: BlobService);
    uploadImage(req: any): Promise<import("mongoose").Document<unknown, {}, Blob> & Blob & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getBlob(params: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
