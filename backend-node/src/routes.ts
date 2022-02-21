import { Router } from "express";
import { LoginUserController } from "./controller/acess";

const loginUser = new LoginUserController();

const router = Router();

router.post('/login', loginUser.handle);

export { router };