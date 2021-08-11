const express = require('express');
const router = express.Router();

//@route GET api/users 
// @desc Test posts 
// @access Public


router.get('/',(req,res)=>{
    res.send('posts Route');
})

module.exports = router;