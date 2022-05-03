const router = require('express').Router();


router.get('/test',(req, res) => {
    res.send(`<h2>User Test Route</h2>`)
})

router.post('/userposttest',(req, res) => {
    const userName = req.body.userName;
    const age = req.body.userAge
    console.log(`${userName} ${age}`);
    res.send("data collected");
})

module.exports = router