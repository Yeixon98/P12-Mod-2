import { Request, Response, Router } from "express";
import { User } from "../models/user";

class UserRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  getUser = (req: Request, res: Response) => {
    const filter = req.query.email ? { email: req.query.email.toString() } : {};

    User.find(filter)
      .then(async (result) => {
        if (result.length > 0) res.status(200).json(result);
        else res.status(404).json({ message: "User/s not Found" });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  };

  postUser = (req: Request, res: Response) => {
    const newUser = new User({
      name: req.body.name,
      surname: req.body.surname,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password,
    });

    newUser
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res
          .status(500)
          .json({
            message: err.erros
              ? err.errors.email
                ? err.errors.email.message
                : err.message
              : err,
          });
      });
  };

  putUser = (req: Request, res: Response) => {
    User.findOneAndUpdate({ email: req.query.email }, req.body, {
      new: true,
    })
      .then((result) => {
        if (result) res.status(200).json(result);
        else res.status(404).json({ message: "User not Found" });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  };

  deleteUser = (req: Request, res: Response) => {
    User.findOneAndDelete({ email: req.query.email })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  };

  routes = () => {
    this.router.get("/user", this.getUser);
    this.router.post("/user", this.postUser);
    this.router.put("/user", this.putUser);
    this.router.delete("/user", this.deleteUser);
  };
}

const userRoutes = new UserRoutes();
export default userRoutes.router;
