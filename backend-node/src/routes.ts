import { Router } from "express";
import { LoginUserController } from "./controller/acess";
import { UserController } from "./controller/user";

const router = Router();

// Login 
const loginUser = new LoginUserController();
// User
const insertUser = new UserController();

// Login Routes
router.post('/login', loginUser.handle);
// User routes
router.post('/user/insert', insertUser.insert);

export { router };