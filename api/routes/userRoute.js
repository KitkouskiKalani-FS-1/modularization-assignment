const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/user");
const mongoose = require('mongoose');
const {findUser, saveUser} = require('../../db/db');

router.post('/signup', async (req, res) =>{
    //find user by email {email: email}
    //if user exist return 409(conflict) message user exist 
    //else encrypt password 
    //create new user object with hashed password
    //save user
    // lastName: req.body.lastName,
    // address: req.body.address,
    // city: req.body.city,
    // state: req.body.state,
    // zip: req.body.zip,
    const user = await findUser({email: req.body.email})
    if( user ){
        res.status(409).json({ message:"There is already a user with that email"})
    }
    else{
        bcrypt.hash(req.body.password, 10,(err, hash)=>{
            if(err){
                res.status(500).json({ message: err.message })
            } else{
                const user = new User({
                    _id: mongoose.Types.ObjectId(),
                    firstName: req.body.firstName,
                    email: req.body.email,
                    password: hash,
                });
                //save user to db
                saveUser(user);
                res.status(201).json({ 
                    message: 'Signup - POST',
                    user, user
                 })
            }
        })
    }
})

router.post('/login', async (req, res) =>{
    //find user by email
    //if user not found then return error 401(unauthorized) message saying authorization failed
    //else
    //compare passwords
    //test for error 
    //test the result
    //message authorization successful
    const user = await findUser({email: req.body.email})
    if(user){
        bcrypt.compare(req.body.password, user.password , (err, result)=>{
            if(err) return res.status(501).json({message: err.message})
    
            if(result){
                res.status(200).json({
                    message: "Login - POST, Authorization Successful",
                    result: result,
                });
            } else {
                res.status(401).json({
                    message: "Authorization Failed",
                    result: result
                });
            }
        })
    }
    else{
        res.status(401).json({ message:"Email not found!"})
    }
    
})

router.get('/profile', (req, res) =>{
    res.json({
        message: 'User Profile - GET',
        hostname: req.hostname,
    })
})

module.exports = router;