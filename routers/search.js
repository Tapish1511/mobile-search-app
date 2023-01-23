const express = require('express');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const { readdirSync } = require('fs');

const router = express.Router();
router.use(express.static(path.join(__dirname, 'public')));

const amazonUrl = 'https://www.amazon.in/s?k='

router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '..', 'public', 'search', 'search.html'));
})

router.post('/', (req, res)=>{
    console.log(req.body.query)
    let query = req.body.query;
    getData(query, res);
    
})

async function getData(query, res){
    
    axios.get(amazonUrl+query)
    .then((response)=>{
        const $ = cheerio.load(response.data);
        
        const scrapData = [];
        
        const row = $('.s-result-item').find('.sg-row');
        // .each((i, element)=>{
        //     scrapData.push({
        //         img: $(ele)
        //         price: $(element).find('.a-price-whole').text(),
        //         features: $(element).find('.a-list-item').text()
        //     });

        // });
        for(let i=0; i<row.length; i++){
            scrapData.push({
                img: $(row[i]).find('.s-image').toString(),
                price: $(row[i]).find('.a-price-whole').text(),
                features: $(row[i]).find('.a-size-medium, .a-color-base, .a-text-nromal').text()
            });
        }
       
        const jsonData = JSON.stringify(scrapData);
        res.json(scrapData);
    
    })
    .catch(error=>{
        console.log("error");
    })

    
    
}




module.exports = router;