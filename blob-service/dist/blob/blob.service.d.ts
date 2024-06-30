import { Model } from 'mongoose';
import { Response } from 'express';
export declare class BlobService {
    private blobModel;
    constructor(blobModel: Model<Blob>);
    storeImage(base64: string, token: string): Promise<import("mongoose").Document<unknown, {}, Blob> & Blob & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getBlob(id: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
