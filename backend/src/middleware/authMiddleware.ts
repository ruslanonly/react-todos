import jwt, { Secret } from "jsonwebtoken";
import asyncHandler from "express-async-handler"
import { NextFunction, Request, Response } from "express";
import UsersService from "../services/users.service";
const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      let decoded = jwt.verify(token, process.env.JWT_SECRET as Secret);

      let { id } = decoded as {id: number};
      let user = await UsersService.getUserById(id);
      let cookie = {
        id: user._id,
        email: user.email,
        username: user.username
      }
      res.cookie("user", cookie);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if(!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect }