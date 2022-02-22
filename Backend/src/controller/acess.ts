import { Request, Response } from "express";

import { loginUser } from '../models/login';


export class LoginUserController {
    async handle(req: Request, res: Response){
        if(!req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('ip')){
            res.status(400).json({'Error': 'Missing parameters Ip or Email'})
        } else if ( req.body.email === '' || req.body.ip === ''){
            res.status(400).json({'Error': 'Parameters Ip or Email are empty'})
        } else {
            const loginResponse = await loginUser(req.body);
    
            return res.json(loginResponse);
        }
    }
}

