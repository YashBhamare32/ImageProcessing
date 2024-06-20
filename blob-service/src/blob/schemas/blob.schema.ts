import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

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
    status : string
};
export const blobSchema = SchemaFactory.createForClass(Blob);