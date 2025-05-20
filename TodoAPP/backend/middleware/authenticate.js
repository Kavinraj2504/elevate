const dotenv=require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const{userModel,taskModel}=require('../models/taskModel');

//token verifier
async function tokenValidator(req, res, next){
    let token = req.headers.authorization.split(' ')[1];
    try{
        token = jwt.verify(token, process.env.SECRET);
    }
    catch(err){
        return res.status(401).send({error:err,
        "message":"error while verifying token"});
    }
    req.userInfo=token;
    next()
}

//to generate token
async function tokenGenerator(req, res, next){
    let email=req.body.email.trim();
    try{
        let user= userModel.findOne({email})
        if(!user){
            return res.status(401).send("User Not Found");
        }

    }
    catch(err){

    }

}

