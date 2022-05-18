import { model, Schema } from "mongoose";

// extends Document  NOOO -> https://mongoosejs.com/docs/typescript.html#using-extends-document
export interface UserI{
  name: string;
  surname: string;
  age: number;
  email: string;
  password: string;
}

export const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export const User = model<UserI>("User", UserSchema);
