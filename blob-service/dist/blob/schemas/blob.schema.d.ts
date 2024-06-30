export declare class Blob {
    id: number;
    token: string;
    base64: string;
    status: string;
}
export declare const blobSchema: import("mongoose").Schema<Blob, import("mongoose").Model<Blob, any, any, any, import("mongoose").Document<unknown, any, Blob> & Blob & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Blob, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Blob>> & import("mongoose").FlatRecord<Blob> & {
    _id: import("mongoose").Types.ObjectId;
}>;
