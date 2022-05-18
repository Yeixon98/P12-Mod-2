import { model, Schema } from "mongoose";

export interface UserI extends Document{
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
