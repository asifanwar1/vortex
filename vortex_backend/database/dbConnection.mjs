import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config({ path: './config.env' });

const DB = process.env.MONGO_URI;



mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then( ()=>{

    console.log('connection successful');

}).catch( (err)=>{

    console.log('no connection');
    console.log(err);

});