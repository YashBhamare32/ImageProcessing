import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Users extends Document {
  @Prop({ required: true , unique : true})
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  tid: string;

  @Prop({ required: true })
  oid: string;

  @Prop({ required: true })
  aud: string;

  @Prop({ required: true })
  azp: string;

  @Prop({ type: [String], required: true })
  name: string[];
}

export const UserSchema = SchemaFactory.createForClass(Users);
