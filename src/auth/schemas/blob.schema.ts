import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Status{
    PENDING = "PENDING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED"
}

@Schema({
    timestamps:true
})

export class Blob{
    @Prop()
    id : number

    @Prop()
    token : string

    @Prop()
    base64Image : string

    @Prop()
    status : Status
};
export const blobSchema = SchemaFactory.createForClass(Blob);