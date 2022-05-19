import { Document, model, Schema } from "mongoose";

export interface StudentI extends Document {
  nif: string;
  name: string;
  surname: string;
  age: number;
  email: string;
  degree: string;
  course: string[];
}

export const StudentSchema = new Schema(
  {
    nif: {
      type: String,
      required: true,
      unique: true,
    },
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
    degree: {
      type: String,
      required: true,
    },
    course: [{
      type: String,
      required: true
    }]
  },
  {
    versionKey: false,
  }
);

export const Student = model<StudentI>("Student", StudentSchema);
