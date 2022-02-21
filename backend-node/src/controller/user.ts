import { Request, Response } from "express";
import { validateFields } from "../utils/validateHasProperty";

import { insertUser } from "../models/customer";

export class UserController {
    async insert(req: Request, res: Response){
        const responseValidate = validateFields(req.body, 'email', 'pass', 'religion', 'ip', 'name', 'user_type');

        responseValidate.map(validate => {
            if(!validate.exists){
                return res.json({'Error': `Missing parameter ${validate.field}`});
            } else if (validate.empty){
                return res.json({'Error': `Parameter ${validate.field} are empty`});
            } 
        });

        const insertUserResponse = await insertUser(req.body);
    
        return res.json(insertUserResponse);
    }
}