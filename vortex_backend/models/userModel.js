import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const userModel = new mongoose.Schema({
    userName: {
        type : String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    }, 
    userPassword: { 
        type: String,
        required: true,
    },
        
},{timestamps:true})



// hashing password

userModel.pre('save', async function(next){
    
    if(this.isModified('userPassword')){
        this.userPassword =  await bcrypt.hash(this.userPassword, 12);
    }
    next();

});



//generating token
// userModel.methods.generateAuthToken = async function(){
//     try{
//         let token = jwt.sign({_id: this._id}, process.env.ACCESS_TOKEN_KEY, {expiresIn: "7d"});
//         return token;

//     }catch(err){
//         console.log(err);
//     }
// }



const User = mongoose.model('USER', userModel);

export default User;

