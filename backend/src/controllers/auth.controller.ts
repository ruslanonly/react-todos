import { Request, Response } from "express";

class AuthController {
  register(req: Request, res: Response) {
    console.log("register");
  }

  login(req: Request, res: Response) {
    console.log("login");
  }
}

export default new AuthController();