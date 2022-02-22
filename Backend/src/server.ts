import express from 'express'
import { router } from './routes';

const app  = express();
const port = 3333;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-type');
    next();
});

app.use(express.json());
app.use(router);


app.listen(port, () => { console.log(`🚀 Sever is running on port ${port}`) });