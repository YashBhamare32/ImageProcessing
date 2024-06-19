/// <reference types="multer" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Users } from 'src/auth/schemas/user.schema';
import { BlobService } from 'src/blob/blob.service';
import { Model } from 'mongoose';
export declare class JobService {
    private blobService;
    private blobModel;
    constructor(blobService: BlobService, blobModel: Model<Blob>);
    createJob(image: Express.Multer.File, user: Users, headers: any): Promise<import("mongoose").Document<unknown, {}, import("src/auth/schemas/blob.schema").Blob> & import("src/auth/schemas/blob.schema").Blob & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getJob(params: any): Promise<import("mongoose").Document<unknown, {}, Blob> & Blob & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
