import { Router } from "express";
import userRoutes from "./user";

export class Routes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.setRouters();
  }

  setRouters = () => {
    this.router.use(userRoutes);
  };
}

const routes = new Routes();
export default routes.router;
