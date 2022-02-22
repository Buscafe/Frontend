import { Router } from "express";
import { LoginUserController } from "./controller/acess";
import { UserController } from "./controller/user";

const router = Router();

// Login 
const loginUser = new LoginUserController();
// User
const user = new UserController();

// Login Routes
router.post('/login', loginUser.handle);
// User routes
router.post('/user/insert', user.insert);
router.post('/user/update', user.update);

export { router };