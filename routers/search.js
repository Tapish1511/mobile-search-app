const express = require('express');
const request = require('request');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');


const router = express.Router();
router.use(express.static(path.join(__dirname, 'public')));

const amazonUrl = 'https://www.amazon.in/s?k=';
const flipkartUrl = 'https://www.flipkart.com/search?q=';
let query = '';

router.get('/', (req, res)=>{
    res.set('Cache-Control', 'no-cache');
    res.sendFile(path.join(__dirname, '..', 'public', 'search', 'search.html'));
})

router.post('/', (req, res)=>{
    query = req.body.query;
    console.log(query);
    res.set('Cache-Control', 'no-cache');
    res.redirect('/search');
});

router.get('/amazondata', (reqe, rese)=>{
    getAmazonData(query, rese);
});

router.get('/flipkartdata', (reqe,rese)=>{
    getFlipkartData(query, rese);
})

async function getAmazonData(query, rese){
    let scrapData = [];
    axios.get(amazonUrl+query)
    .then((response)=>{
        let $ = cheerio.load(response.data);        
        const row = $('.s-result-item').find('.a-section > .sg-row');
        for(let i=0; i<row.length; i++){
            let image = $(row[i]).find('.s-image').attr('src');
            let price = $(row[i]).find('.a-price-whole').text();
            let features = $(row[i]).find('.sg-col-inner h2').text();
            let link = $(row[i]).find('.sg-col-inner h2 > a').attr('href');
            let title = features.split('|')[0];
           
            if(image != null && price != "" && features != null && link != null){
                scrapData.push({
                    img: image,
                    price: "₹"+price,
                    features: features,
                    link: link,
                    web: 'amazon',
                    url: 'https://www.amazon.in',
                    title: title
                });
            }
            
           
        }
        rese.json(scrapData);
        console.log("i am here now")
        
    
    })
    .catch(error=>{
        console.log("error");
    })
    
    
}


async function getFlipkartData(query, rese){
    let scrapData = []
    axios.get(flipkartUrl+query)
    .then((response)=>{
        let $ = cheerio.load(response.data);        
        const row = $('._2kHMtA');
        for(let i=0; i<row.length; i++){
            let image = $(row[i]).find('._396cs4').attr('src');
            let price = $(row[i]).find('._30jeq3').text();
            let features = $(row[i]).find('_1xgFaf').text();
            let link = $(row[i]).find('._1fQZEK').attr('href');
            let title = $(row[i]).find('._4rR01T').text();
           
            if(image != null && price != "" && features != null && link != null){
                scrapData.push({
                    img: image,
                    price: price,
                    features: features,
                    link: link,
                    web: 'flipkart',
                    url: 'https://www.flipkart.com',
                    title: title
                });
            }
            
           
        }
        rese.json(scrapData);
        console.log("i am here now")
        
    
    })
    .catch(error=>{
        console.log(error);
    })
}



module.exports = router;