import { Document } from 'mongoose';
export declare class Users extends Document {
    username: string;
    password: string;
    tid: string;
    oid: string;
    aud: string;
    azp: string;
    name: string[];
}
export declare const UserSchema: import("mongoose").Schema<Users, import("mongoose").Model<Users, any, any, any, Document<unknown, any, Users> & Users & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Users, Document<unknown, {}, import("mongoose").FlatRecord<Users>> & import("mongoose").FlatRecord<Users> & Required<{
    _id: unknown;
}>>;
