import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";

import UsersService from "../services/users.service";
import { IUser } from "../types";

const register = asyncHandler(async (req : Request, res : Response) => {
  let { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Fill all the needed fields.");
  }

  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, salt);

  let newUser = await UsersService.createUser({
    username: username,
    email: email,
    password: hashedPassword
  });
  if (newUser) {
    res.status(200).json({
      id: newUser._id,
      username: newUser.username,
      email: newUser.email
    });
  } else {
    res.status(400);
    throw new Error("Invalid user's data");
  }
})

const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let { username, password } = req.body;

  let user : IUser = await UsersService.getUserByUsername(username);
  let authenticated = await bcrypt.compare(password, user.password);

  if (user && authenticated) {
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400);
    throw new Error("User authentication error.")
  }
})

const getMe = asyncHandler(async (req: Request, res: Response) => {
  res.json(req.user);
})

function generateToken(id: number) {
  let token = jwt.sign({ id: id }, process.env.JWT_SECRET as Secret, {
    expiresIn: "30d"
  });
  return token;
}

export default { register, login, getMe };