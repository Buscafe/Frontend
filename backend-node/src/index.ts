import express from 'express'

import { loginUser } from './acess';

const app  = express();
const port = 3333;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-type');
    next();
});

app.use(express.json());

app.post('/login', async (req, res) => {
    if(!req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('ip')){
        res.status(400).json({'Error': 'Missing parameters Ip or Email'})
    } else if ( req.body.email === '' || req.body.ip === ''){
        res.status(400).json({'Error': 'Parameters Ip or Email are empty'})
    } else {
        const loginResponse = await loginUser(req.body);

        res.json(loginResponse);
    }
});

app.listen(port, () => {
    console.log(`🚀 Sever is running on port ${port}`)
});