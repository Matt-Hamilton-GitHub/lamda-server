const router = require('express').Router();
const User = require('../models/User');
const CryptoJs = require('crypto-js');

//Register
router.post('/register', async (req,res) => {
    
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJs.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),     
    })

    //save user to DB
    try{
        const saveUser = await newUser.save();
        res.status(201).json(saveUser);
    }catch(err) {
        res.status(500).json(err)};

    //LOGIN

    router.post("/login", async (req,res) => {
        try{
            const user = await User.findOne({username: req.body.username});
            !user && res.status(401).json('Wrong password or Username');

            const hashedPassword = CryptoJs.AES.decrypt(user.password, process.env.SECRET_KEY);
            const originalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);

            originalPassword !== req.body.password && res.status(401).json('Wrong Password or Username');

            const {password, ...others} = user._doc;


            res.status(200).json(others);

        }catch(err) {res.status(500).json(err)}
    })
}) 


module.exports = router