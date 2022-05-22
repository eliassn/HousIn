import { Router } from "express";
import { registerController } from "../controllers/register";
import { register } from "../services/register";

const authRouter = Router()

authRouter.post('/register',register)


export default authRouter