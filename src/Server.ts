import * as mongoose from "mongoose";
import { Student } from "./models/student";
import { putStudent, postStudent } from "./types";

export default class Server {
  constructor() {
    this.connectMongoDB();
  }

  private connectMongoDB = () => {
    let MONGODB_URI: string = `mongodb://tecno:tecno@127.0.0.1:21100/DSI-Mod`;

    if (process.env.NODE_ENV === "test") {
      console.log("============= TEST =============");
      MONGODB_URI = `mongodb://tecno:tecno@127.0.0.1:21100/DSI-Mod-Test`;
    }

    mongoose
      .connect(MONGODB_URI, { autoIndex: true })
      .then(() => console.log("Database connected!"))
      .catch(() => console.error("Error connecting to the database"));
  };

  getStudent = (nif: string) => {
    return new Promise<string>((resolve, reject) => {
      const filter = nif ? { nif: nif } : {};
      Student.find(filter)
        .then(async (result) => { 
          if (result.length > 0) resolve(JSON.stringify(result))
          else resolve(JSON.stringify({message: 'Student/s not Found'}))
        })
        .catch((err) => {
          reject(JSON.stringify({ error: err }))
        });
    });
  };

  postStudent = (request: postStudent) => {
    return new Promise<string>((resolve, reject) => {
      const newStudent = new Student(request);
      newStudent.save()
        .then((result) => {
          resolve(JSON.stringify(result))
        })
        .catch((err) => {
          reject(JSON.stringify({ error: err }))
        });
    });
  };

  putStudent = (request: putStudent) => {
    return new Promise<string>((resolve, reject) => {
      Student.findOneAndUpdate({ nif: request.nif }, request, {
        new: true,
      })
        .then(async (result) => { 
          if (result) resolve(JSON.stringify(result))
          else resolve(JSON.stringify({message: 'Student not Found'}))
        })
        .catch((err) => {
          reject(JSON.stringify({ error: err }))
        });
    });
  };

  deleteStudent = (nif: string) => {
    return new Promise<string>((resolve, reject) => {
      Student.findOneAndDelete({ nif: nif })
        .then((result) => {
          resolve(JSON.stringify(result))
        })
        .catch((err) => {
          reject(JSON.stringify({ error: err }))
        });
    });
  };

  resetDB = async () => {
    await Student.deleteMany({})
    mongoose.disconnect()
  }
}
