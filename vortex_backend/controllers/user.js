import { Router } from 'express';
const router = Router();
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';



router.post('/createNewUser', async(req, res, next)=>{
    const {userName, userEmail, userPassword} = req.body;
   
    if(!userName || !userEmail || !userPassword){
        return res.status(422).json({ error: "Please filled the form properly"})
    }

    const userExist = await User.findOne({ userEmail: userEmail });
  
    try {

        if (userExist) {
            res.status(400)
            throw new Error('User already exists')
        }

        const user = await User.create({
            userName,
            userEmail,
            userPassword,
          })
        
          if (user) {
            res.status(201).json({
              _id: user.id,
              userName: user.userName,
              userEmail: user.userEmail,
              token: generateAuthToken(user.id),
            })
          } else {
            res.status(400)
            throw new Error('Invalid user data')
          }
        
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error)
    }
});






router.post('/signInUser', async(req, res, next)=>{
    const {userEmail, userPassword} = req.body;

    const userExist = await User.findOne({ userEmail: userEmail});
    // console.log(userExist)
    
    if (!userExist) {
        return res.status(404).send({ 
            message: "User does not exist." 
        });
    }
    

    const matchPassword = await bcrypt.compare(userPassword, userExist.userPassword); 

    try {
        if (userExist && matchPassword ){

            // let token = await userExist.generateAuthToken();

            const userProfile = {
                _id: userExist._id,
                userName: userExist.userName,
                userEmail: userExist.userEmail,
                token: generateAuthToken(userExist._id),
            };          
         


            res.status(201).json(userProfile);
            
        }else{
            res.status(400).json({message: "invalid crededntials."})
        }
        
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }

});



const generateAuthToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, {expiresIn: '30d',})
}



  
export default router;