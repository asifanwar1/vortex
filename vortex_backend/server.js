import dotenv from 'dotenv';
import express from 'express';
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config({ path: './config.env' });

const app = express();


app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// app.use(import('./routers/router'));
import router from './routers/router.mjs'
app.use(router);


const PORT = process.env.PORT || 5000;



app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
})