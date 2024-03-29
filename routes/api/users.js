const express = require('express');
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcrypt/bcrypt.js")
const jwt = require('jsonwebtoken');
const {check,validationResult} = require("express-validator");
const User = require("../../models/User.js")
const config = require('config');
const normalize = require('normalize-url');


//@route POST api/users 
// @desc Register User
// @access Public
router.post('/',[
    check("name","Name is required").not().isEmpty(),
    check("email","please enter the valid email").isEmail(),
    check("password","please enter the password with 6 or more characters").isLength({min: 6})


],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }

    const {name,email,password}= req.body;
    try{
        let user = await User.findOne({ email});

        if(user){
           return res.status(400).json({ errors: [{msg: "User already exists"}]});
        }

        const avatar = normalize(
            gravatar.url(email, {
              s: '200',
              r: 'pg',
              d: 'mm'
            }),
            { forceHttps: true }
          );

        user = new User({
            name,
            email,
            avatar,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);

        await user.save();

        const payload = {
            user:{
                id: user.id
            }
        }
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000},
            (err,token)=>{
                if(err) throw err;
                res.json({ token });
            }
        );

    }catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }


})

module.exports = router;