import { QueryResult } from "pg";

import db from "../database/db";

import { IUser } from "../types";

class UsersService {
  async getUsers() {
    let q_res: QueryResult = await db.query("SELECT * FROM users;");
    let users : IUser[] = q_res.rows as IUser[];
    return users;
  }

  async getUserById(id: number) {
    let q_res: QueryResult = await db.query(`SELECT * FROM users WHERE _id = ${id};`);
    let user : IUser = q_res.rows[0] as IUser;
    return user;
  }

  async getUserByUsername(username: string) {
    let q_res: QueryResult = await db.query(`SELECT * FROM users WHERE username = $1;`, [username]);
    let user : IUser = q_res.rows[0] as IUser;
    return user;
  }

  async createUser(userData : {username: string, email: string, password: string}) {
    let {username, email, password} = userData;
    let q_res: QueryResult = await db.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *", [username, email, password]);
    let user : IUser = q_res.rows[0] as IUser;
    return user;
  }
}

export default new UsersService();