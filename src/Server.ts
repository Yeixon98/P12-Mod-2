import * as mongoose from "mongoose";
import * as express from "express";
import { Request, Response, Application } from "express";
import * as morgan from "morgan";
import { join } from "path";

import routes from "./routes/index";
import { User } from "./models/user";

export default class Server {
  private app: Application;
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

    if (process.env.NODE_ENV === "test") {
      this.app.get("/reset", async (_: Request, res: Response) => {
        await User.deleteMany({});
        res.status(200).json({ message: "Reinicio..." });
      });
    }
  };

  connectMongoDB = () => {
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

  listen = () => {
    this.app.listen(this.port, () => {
      console.log("Server is running on port: " + this.port);
    });
  };
}
