import { IUserData } from "../../types";

declare global {
  namespace Express {
    interface Request {
      user: IUserData
    }
  }
}