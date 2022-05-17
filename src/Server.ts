import * as mongoose from "mongoose";
import * as express from "express";
import * as morgan from "morgan";
import { join } from "path";

import routes from "./routes/index";

export default class Server {
  private app: express.Application;
  constructor(private readonly port: number) {
    this.app = express();
    this.initApp();
    this.connectMongoDB();
  }

  initApp = () => {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static(join(__dirname, "../public")));

    this.app.use(routes);
  };

  connectMongoDB = () => {
    let MONGODB_URI: string = `mongodb://admin:tecno@127.0.0.1:21100`;
    
    mongoose
      .connect(MONGODB_URI, {autoIndex: true})
      .then(() => console.log("Database connected!"))
      .catch((err) => console.error("Error connecting to the database: "));
  };

  listen = () => {
    this.app.listen(this.port, () => {
      console.log("Server is running on port: " + this.port);
    });
  };
}