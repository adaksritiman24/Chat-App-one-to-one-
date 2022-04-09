const {Router} = require("express");

const router = Router();

router.get('/index',(req, res)=> {
    res.send({
        "name" : "Sritiman",
        "age" : 22,
    })
});

module.exports = router;