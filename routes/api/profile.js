const express = require('express');
const router = express.Router();
const auth= require("../../middleware/auth");
const {check,validationResult } = require('express-validator');

const Profile = require("../../models/profile");
const User = require("../../models/User");

//@route GET api/profile/me
// @desc Get current user profile
// @access Private


router.get('/me',auth,async(req,res)=>{
    try{
        const profile = await Profile.findOne({ user: req.user.Id}).populate(
            'User',
            ['name','avatar']
        );
        if(!profile){
            return res.status(400).json({
                msg: 'There is no profile for this year'
            });
        }

        res.json(profile);

    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");

    }
})


//@route GET api/profile
// @desc Create or update user profile
// @access Private

router.post(
    '/',
    [
        auth,
        [
            check('status','Status is required')
                .not()
                .isEmpty(),
            check('skills','skills is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors:errors.array()});
        }


        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        // Build profile object
        const profileFeilds = {};
        profileFeilds.user = req.user.id;

        if(company) profileFeilds.company = company;
        if(website) profileFeilds.website = website;
        if(location) profileFeilds.location = location;
        if(bio) profileFeilds.bio = bio;
        if(status) profileFeilds.status = status;
        if(githubusername) profileFeilds.githubusername = githubusername;
        if(skills){
            profileFeilds.skills = skills.split(',').map(skill => skill.trim());
        }

        // build social object
        profileFeilds.social ={}
        if(youtube) profileFeilds.social.youtube = youtube;
        if(twitter) profileFeilds.social.twitter = twitter;
        if(facebook) profileFeilds.social.facebook = facebook;
        if(linkedin) profileFeilds.social.linkedin = linkedin;
        if(instagram) profileFeilds.social.instagram = instagram;

        try{
            let profile = await Profile.findOne({ user: req.user.id});
            if(profile){
                // update
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    {$set: profileFeilds},
                    { new: true }
                );
                return res.json(profile);
            }

            // create
            profile= new Profile(profileFeilds);
            await profile.save();
            res.json(profile);
        }catch(err){
            console.error(err.message);
            res.status(500).send("server error");
        }
    }
);


//@route GET api/profile
// @desc Get all profiles
// @access Public

router.get('/',async (req,res)=>{
    try {
        const profiles = await Profile.find().populate('user',['name','avatar'])
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route GET api/profile/user: user_id
// @desc Get profile by user Id
// @access Public

router.get('/user/:user_id',async (req,res)=>{
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user',['name','avatar']);
        if(!profile) 
            return res.status(400).json({msg: 'Profile Not Found.'});
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if(err.kind== 'ObjectId'){
            return res.status(400).json({msg: ' Profile Not found.'});
        }
        res.status(500).send('Server Error');
    }
});


//@route Delete api/profile
// @desc Delete profile,user& posts
// @access Private

router.delete('/', auth ,async (req,res)=>{
    try {
        //todo - remove users posts
        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        // Remove user
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: 'User deleted '});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;