const router = require('express').Router();
const User = require('../models/User');
const {verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');

//UPDATE
router.put('/:id', verifyTokenAndAuthorization, async (req,res) => {

    if(req.user.id === req.params.id || req.user.isAdmin) {
            if(req.body.password){
                req.body.password = CryptoJs.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
            }
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },{new:true});
        res.status(200).json(updatedUser);
    }
    catch(err){res.status(500).json(err)}
})


//DELETE

router.delete('/:id', verifyTokenAndAuthorization, async (req,res) =>{

    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json(`user has been DELETED`);
    }catch(err){res.status(500).json(err)}
})

//GET USER_NAME
router.get('/find/:id',verifyTokenAndAdmin, async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, ...other} = user._doc;

        res.status(200).json(other);
    } 
    catch(err){res.status(500).json(err)}
})

module.exports = router;