import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({
    type: [String],
    maxlength: 11,
    minlength: 11,
    required: true,
    unique: true,
    trim: true,
    index: true,
  })
  mobile: string[];

  @Prop({ type: String, maxlength: 500, required: false })
  avatar: string;

  @Prop({ type: String, unique: true, maxlength: 200 })
  email: string;

  @Prop({
    type: String,
    minlength: 8,
    maxlength: 64,
    required: true,
    trim: true,
  })
  password: string;

  @Prop({ type: String, trim: true })
  salt: string;

  @Prop({ type: String, trim: true, default: 0 })
  wallet: string;
}

export const userModel = SchemaFactory.createForClass(User);
