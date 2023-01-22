const express = require('express');
const cheerio = require('cheerio');

const router = express.Router();


router.get("/", (req, res)=>{
    res.render('search');
})

router.post('/', (req, res)=>{

})

module.exports = router;