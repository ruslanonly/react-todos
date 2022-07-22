import { Request, Response } from "express";

import UsersService from "../services/users.service";

import { IUser } from "../types";

class UserController {
  async getUsers(req : Request, res : Response) {
    try {
      let users: IUser[] = await UsersService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).send("Can't get the users")
    }
  }

  async getUser(req : Request, res : Response) {
    let id = parseInt(req.params.id);
    try {
      let user: IUser = await UsersService.getUser(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).send("Can't get a user with specified id.");
    }
  }

  async createUser(req : Request, res : Response) {
    let { username, email, rawPassword } = req.body;
    try {
      let newUser = await UsersService.createUser({
        username : username,
        email: email,
        password: rawPassword
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400);
    }
  }
}

export default new UserController();