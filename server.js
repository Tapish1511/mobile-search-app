const express = require('express');
const path = require('path');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));


app.get('/', (req, res)=>{
    res.render('index');
})

// this get function will redirect to the search page.



const searchRouter = require('./routers/search');
app.use('/search', searchRouter);



app.post('/', (req, res)=>{
    isvalid = true;
    if(isvalid){
        res.redirect('/search');
    }
    else{
        res.redirect('./');
    }
});

app.listen(3000);