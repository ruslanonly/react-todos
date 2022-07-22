import express from "express";
import UsersController from "../controllers/users.controller";
let router = express.Router();

router.get("/users", UsersController.getUsers)
router.get("/user/:id", UsersController.getUser);

export default router;