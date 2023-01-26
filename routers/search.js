const express = require('express');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const { features } = require('process');


const router = express.Router();
router.use(express.static(path.join(__dirname, 'public')));

const amazonUrl = 'https://www.amazon.in/s?k='

router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '..', 'public', 'search', 'search.html'));
})

router.post('/', (req, res)=>{
    let query = req.body.query;
    router.get('/amazondata', (reqe, rese)=>{
        getAmazonData(query, rese);
    });
    res.sendStatus(200);
    
})

async function getAmazonData(query, res){
    const scrapData = [];
    axios.get(amazonUrl+query)
    .then((response)=>{
        const $ = cheerio.load(response.data);
        
        
        
        const row = $('.s-result-item').find('.a-section > .sg-row');
        // .each((i, element)=>{
        //     scrapData.push({
        //         img: $(ele)
        //         price: $(element).find('.a-price-whole').text(),
        //         features: $(element).find('.a-list-item').text()
        //     });

        // });
        for(let i=0; i<row.length; i++){
            let image = $(row[i]).find('.s-image').attr();
            let price = $(row[i]).find('.a-price-whole').text();
            let features = $(row[i]).find('.sg-col-inner h2').text();
            let link = $(row[i]).find('.sg-col-inner h2 > a').attr();
           
            if(image != null && price != null && features != null && link != null)
            
            scrapData.push({
                img: image,
                price: price,
                features: features,
                link: link,
                web: 'amazon',
                url: 'https://www.amazon.in'
            });
        }
        res.json(scrapData);
    
    })
    .catch(error=>{
        console.log("error");
    })

    
    
}




module.exports = router;